<script lang="ts">
	import RideItem from '$lib/components/RideItem.svelte';
	import { currentUser, pb } from '$lib/glue/pocketbase';
	import getOtherUser from '$lib/util/glue/chat/getOtherUser';
	import { format } from 'date-fns';
	import { onDestroy, onMount } from 'svelte';
	import TextInput from '../TextInput.svelte';
	import IconBack from '$lib/icons/glue/IconBack.svelte';

	export let booking;

	let chatGroups = [];
	let content = '';
	let unsubscribe: () => void;
	let prevChatUser = null;
	let prevDateString = null;
	let innerWidth = 0;

	$: otherUser =
		booking?.driver === $currentUser?.id ? booking?.expand?.requestor : booking?.expand?.driver;

	const appendChat = (chat) => {
		const chatDateString = format(new Date(chat?.created), 'MMM dd');

		if (chatGroups?.length === 0 || !prevChatUser || prevDateString !== chatDateString) {
			// first chat group || new date, new chat group
			chatGroups?.push({
				id: chatDateString,
				variant: 'datestamp',
				content: chatDateString
			});
			chatGroups?.push({
				...chat,
				items: [chat]
			});
		} else if (prevChatUser !== chat?.sender) {
			// non-consecutive sender, new chat group
			chatGroups?.push({
				...chat,
				items: [chat]
			});
		} else {
			// consecutive sender, append to group
			chatGroups[chatGroups?.length - 1]?.items?.push(chat);
			chatGroups[chatGroups?.length - 1].id = chat?.id; // update group id to force rerender
		}

		chatGroups = [...chatGroups];
		prevChatUser = chat?.sender;
		prevDateString = chatDateString;
	};

	const fetchChats = async () => {
		try {
			const chatDocs = await pb.collection('chats').getFullList(200, {
				filter: `booking="${booking?.id}"`,
				sort: 'created',
				expand: 'sender,receiver'
			});

			chatGroups = [];

			chatDocs?.forEach((chat) => {
				appendChat(chat);
			});
		} catch (error) {}
	};

	$: {
		if (booking) {
			fetchChats();
		}
	}

	const handleCreateChat = async () => {
		try {
			const receiver = getOtherUser({ booking, user: $currentUser });
			const chatContent = content;

			// reset input value first to make it feel more performant
			content = '';

			pb.collection('chats').create({
				variant: 'text',
				content: chatContent,
				booking: booking?.id,
				sender: $currentUser?.id,
				receiver
			});

			await fetch('/api/email', {
				method: 'POST',
				body: JSON.stringify({
					senderName: $currentUser?.name,
					receiverId: receiver,
					content: chatContent
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
		} catch (error) {}
	};

	const subscribeToChats = async () => {
		try {
			unsubscribe = await pb.collection('chats').subscribe('*', async ({ action, record }) => {
				if (record?.booking === booking?.id && action === 'create') {
					appendChat(record);
				}
			});
		} catch (error) {}
	};

	const chatGroupName = (group) => {
		return group?.sender === booking?.driver
			? booking?.expand?.driver?.name
			: booking?.expand?.requestor?.name;
	};

	onMount(() => {
		subscribeToChats();
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<svelte:window bind:innerWidth />

<div class="relative h-[85vh] rounded md:h-[80vh]">
	<div class="mb-6 md:hidden">
		<a href="/chatrooms/list">
			<button class="btn-neutral btn-sm btn">
				<IconBack />
				Back
			</button>
		</a>
	</div>

	<div class="flex items-center">
		<div class="avatar">
			<div
				class="h-10 w-10 rounded-full ring-1 ring-base-content/20 ring-offset-1 ring-offset-base-100"
			>
				<img src={otherUser?.avatarUrl} />
			</div>
		</div>
		<p class="ml-4 font-medium">{otherUser?.name}</p>
	</div>

	<div class="mt-6">
		<RideItem ride={booking?.expand?.ride} {booking} />
	</div>

	<!-- TODO: chat content -->
	<!-- <div
		class="chat-content-container relative flex flex-1 snap-y snap-proximity flex-col-reverse overflow-y-auto overscroll-y-contain pr-2 pt-0 [&>div>div:last-child]:snap-end"
	>
		<div class="">
			{#if booking}
				{#each chatGroups as group (group?.id)}
					{#if group?.variant === 'datestamp'}
						<div class="divider mt-4 mb-3 text-sm">{group?.content}</div>
					{:else}
						<div class={`chat ${group?.sender === $currentUser?.id ? 'chat-end' : 'chat-start'}`}>
							<div class="chat-header mb-2">
								{chatGroupName(group)}
								<time class="ml-1 text-xs opacity-50"
									>{format(new Date(group?.created), 'hh:mm aaa')}</time
								>
							</div>
							{#each group?.items as item (item?.id)}
								<div class="chat-bubble mb-2">{item?.content}</div>
							{/each}
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	</div> -->

	<!-- TODO: message input -->
	<!-- <form
		on:submit={handleCreateChat}
		class="z-2 absolute left-0 right-0 bottom-0 flex h-20 items-center space-x-2 bg-base-100 py-4 md:p-4"
	>
		<TextInput
			bind:value={content}
			class="input rounded-full border-base-content/40"
			placeholder="Type a message"
			autofocus={innerWidth >= 768 || undefined}
		/>
		<button class="btn-primary btn-md btn rounded-full">Send</button>
	</form> -->
</div>

<style>
	.chat-content-container {
		/* subtracts height of top, bottom panels */
		height: calc(100% - 9rem);
	}
</style>

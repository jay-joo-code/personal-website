<script lang="ts">
	import ChatroomListItem from '$lib/components/ChatroomListItem.svelte';
	import { currentUser, pb } from '$lib/glue/pocketbase';
	import getOtherUser from '$lib/util/glue/chat/getOtherUser';
	import { onDestroy, onMount } from 'svelte';
	import Loading from '../Loading.svelte';

	let bookings = [];
	let unsubscribe: () => void;
	let isLoading = false;

	const appendChat = async (chat) => {
		try {
			let existingChatroom = null;
			const filteredChatrooms = bookings?.filter((chatroom) => {
				if (chatroom?.id === chat?.chatroom) {
					existingChatroom = chatroom;
				}
				return chatroom?.id !== chat?.chatroom;
			});

			if (existingChatroom) {
				// prepend existing chatroom
				bookings = [
					{
						...existingChatroom,
						latestChat: chat
					},
					...filteredChatrooms
				];
			} else {
				// new chatroom
				const newChatroom = await pb.collection('bookings').getOne(chat?.chatroom, {
					expand: 'author,searcher,post'
				});
				bookings = [
					{
						...newChatroom,
						otherUser: getOtherUser({
							chatroom: newChatroom,
							user: $currentUser,
							isExpanded: true
						}),
						latestChat: chat
					},
					...filteredChatrooms
				];
			}
		} catch (error) {}
	};

	const subscribeToChats = async () => {
		try {
			unsubscribe = await pb.collection('chats').subscribe('*', async ({ action, record }) => {
				if (
					action === 'create' &&
					(record?.sender === $currentUser?.id || record?.receiver === $currentUser?.id)
				) {
					appendChat(record);
				}
			});
		} catch (error) {}
	};

	const fetchBookings = async () => {
		isLoading = true;

		try {
			const bookingRecords = await pb.collection('bookings').getFullList(200, {
				filter: `driver = "${$currentUser?.id}" || requestor = "${$currentUser?.id}"`,
				expand: 'ride,driver,requestor,ride.origin,ride.destination,ride.driver',
				sort: '-updated'
			});

			const populateLatestChatPromises = bookingRecords?.map(async (booking) => {
				let latestChat = null;
				try {
					latestChat = await pb.collection('chats').getFirstListItem(`booking = "${booking?.id}"`, {
						sort: '-created'
					});
				} catch (error) {}

				return {
					...booking,
					otherUser:
						booking?.driver === $currentUser?.id
							? booking?.expand?.requestor
							: booking?.expand?.driver,
					latestChat
				};
			});
			const bookings = (await Promise.all(populateLatestChatPromises))?.sort(
				(a, b) =>
					new Date(b?.latestChat?.created)?.getTime() - new Date(a?.latestChat?.created)?.getTime()
			);
			isLoading = false;
			return bookings;
		} catch (error) {
			isLoading = false;
		}
	};

	onMount(async () => {
		subscribeToChats();
		bookings = await fetchBookings();
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<div class="rounded-xl border-base-content/20 md:h-[80vh] md:overflow-auto md:border">
	<div class="mb-3 px-4 md:mt-6 md:px-6">
		<p class="text-2xl font-semibold">Messages</p>
		<p class="mt-4 text-sm text-base-content/70 md:text-xs">
			You'll receive an email notification when someone messages you!
		</p>
	</div>
	<div>
		{#if isLoading}
			<!-- loading state -->
			<div class="mt-8 flex justify-center">
				<span class="loading loading-spinner loading-sm" />
			</div>
		{:else if bookings?.length > 0}
			<!-- chatroom list -->
			<div class="mt-1">
				{#each bookings as booking (booking?.id)}
					<ChatroomListItem {booking} />
				{/each}
			</div>
		{:else}
			<!-- empty state -->
			<div class="mt-8 flex w-full justify-center px-3">
				<div class="flex w-full items-center justify-center rounded-xl bg-base-200 py-4">
					<div class="w-4/6">
						<p class="text-md font-semibold">No messages yet!</p>
						<p class="mt-2 text-sm text-base-content/70">Send messages to see your them here</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<script>
	import { APP_NAME, IS_BETA, PUBLIC_NAVS } from '$lib/glue/config';
	import TrackWidth from './TrackWidth.svelte';
	import './app.css';
</script>

<TrackWidth />

<div class="w-screen">
	<div class="flex flex-col items-center">
		<!-- header -->
		<div class="sticky top-0 z-30 flex w-full justify-center bg-base-100/95">
			<div class={`w-full max-w-4xl`}>
				<div class="navbar px-4">
					<!-- app name -->
					<div>
						<button>
							<a href="/" class="btn-ghost btn px-1 text-2xl font-bold normal-case">
								<p class="">{APP_NAME}</p>
								{#if IS_BETA}
									<span class="mt-2 hidden text-sm text-base-content/60 md:block">beta</span>
								{/if}
							</a>
						</button>
					</div>

					<!-- right side menu -->
					<div class="flex flex-1 items-center justify-end space-x-4 md:space-x-6">
						{#if PUBLIC_NAVS?.length > 0}
							{#each PUBLIC_NAVS as nav}
								<div class="text-sm font-extrabold"><a href={nav.path}>{nav.label}</a></div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="relative w-full max-w-4xl p-4 md:pl-6">
			<!-- body content -->
			<div class="min-h-[82vh] max-w-[94vw]">
				<slot />
			</div>
		</div>
	</div>
</div>

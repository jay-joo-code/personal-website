<script>
	import { APP_NAME, IS_BETA, PUBLIC_NAVS } from '$lib/glue/config';
	import TrackWidth from './TrackWidth.svelte';
	import './app.css';
</script>

<TrackWidth />

<div class="w-screen">
	<div class="drawer">
		<!-- mobile nav: invisible drawer toggle -->
		<input id="drawer-mobile-nav" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center">
			<!-- header -->
			<div class="sticky top-0 z-30 flex w-full justify-center bg-base-100/95">
				<div class={`w-full max-w-4xl`}>
					<div class="navbar px-4">
						<!-- mobile nav: hamburger -->
						{#if PUBLIC_NAVS?.length > 0}
							<div class="flex-none md:hidden">
								<label for="drawer-mobile-nav" class="btn-ghost drawer-button btn-square btn">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										class="inline-block h-5 w-5 stroke-current"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 6h16M4 12h16M4 18h16"
										/></svg
									>
								</label>
							</div>
						{/if}

						<!-- app name -->
						<div>
							<button>
								<a href="/" class="btn-ghost btn px-1 text-2xl font-bold normal-case">
									<p class="uppercase">{APP_NAME}</p>
									{#if IS_BETA}
										<span class="mt-2 hidden text-sm text-base-content/60 md:block">beta</span>
									{/if}
								</a>
							</button>
						</div>

						<!-- right side menu -->
						<div class="flex flex-1 items-center justify-end space-x-2 md:space-x-3">
							<div class="hidden md:block">
								<div class="menu menu-horizontal p-2">
									{#if PUBLIC_NAVS?.length > 0}
										{#each PUBLIC_NAVS as nav}
											<li class="font-medium"><a href={nav.path}>{nav.label}</a></li>
										{/each}
									{/if}
								</div>
							</div>
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
</div>

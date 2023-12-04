<script lang="ts">
	import PageContainer from '$lib/components/glue/PageContainer.svelte';
	import { toast } from '@zerodevx/svelte-toast';
</script>

<PageContainer title="Home">
	<!-- hero -->
	<section class="flex h-[50vh] flex-col justify-center">
		<h1 class="text-5xl font-extrabold">Hi, I'm Jay 👋</h1>
		<p class="mt-8 text-lg leading-relaxed text-base-content/80">
			I'm Jay, a software engineer and computer science major graduate from Cornell University. I
			aspire to build performant software to deliver business impact.
		</p>
	</section>

	<!-- background -->
	<div class="flex min-h-[50vh] items-center">
		<div class="">
			<h2 class="text-2xl font-extrabold text-primary">Background</h2>
			<p class="mt-10 leading-loose text-base-content/80">
				Hey there, I'm Jay, and I'm thrilled to be a part of the tech world as a software engineer!
				I recently graduated from Cornell University with a degree in Computer Science, and I've
				been on a mission to turn my passion for coding into real-world solutions ever since.
			</p>
			<p class="mt-6 leading-loose text-base-content/80">
				From crafting elegant algorithms to creating user-friendly applications, I'm all about
				bringing creativity and innovation to the digital realm. My journey in the world of computer
				science has been nothing short of exhilarating.
			</p>
			<p class="mt-6 leading-loose text-base-content/80">
				I'm always eager to tackle new challenges and learn from the incredible community of
				developers out there. Whether it's debugging lines of code or brainstorming the next big
				app, you can count on me to bring enthusiasm and a fresh perspective to every project. Let's
				dive into the endless possibilities of software engineering together, and I can't wait to be
				a part of your tech-driven adventure!
			</p>
		</div>
	</div>

	<!-- work experience -->
	<div class="flex min-h-[50vh] items-center">
		<div class="w-full">
			<h2 class="text-2xl font-extrabold text-primary">Work experience</h2>
			<div class="mt-12 w-full space-y-12">
				<div class="w-full">
					<div class="flex justify-between">
						<h3 class="text-lg font-extrabold">Akuna Capital</h3>
						<p class="text-sm font-medium text-base-content/80">Jun - Aug 2023</p>
					</div>
					<p class="text-sm text-base-content/80">Software Engineer Intern</p>
					<p class="mt-2 text-sm text-base-content/80">
						Akuna Capital is a quant trading firm that provides liquidity to the market as an
						options market-maker
					</p>
				</div>
				<div class="">
					<div class="flex justify-between">
						<h3 class="text-lg font-extrabold">HubSpot</h3>
						<p class="text-sm font-medium text-base-content/80">Jun - Aug 2022</p>
					</div>
					<p class="text-sm text-base-content/80">Software Engineer Intern</p>
					<p class="mt-2 text-sm text-base-content/80">
						Improved HubDB sorting efficiency in Javascript and React, which decreased average sort
						time from 2 minutes to 0.8 seconds. Developed multiple RESTful API endpoints in Java
						which parses and sorts HubDB data, reducing client-side computation and significantly
						improving performance.
					</p>
				</div>
				<div class="">
					<div class="flex justify-between">
						<h3 class="text-lg font-extrabold">Relate</h3>
						<p class="text-sm font-medium text-base-content/80">Jan - Apr 2021</p>
					</div>
					<p class="text-sm text-base-content/80">Software Engineer Intern</p>
					<p class="mt-2 text-sm text-base-content/80">
						Shortened alert latency by 1100% in Typescript and Vue.js by integrating webhooks to the
						notification system. Integrated with Slack, Gmail, and Github APIs to compile
						notification data with Javascript and Ruby on Rails
					</p>
				</div>
				<div class="">
					<div class="flex justify-between">
						<h3 class="text-lg font-extrabold">Strauss</h3>
						<p class="text-sm font-medium text-base-content/80">Apr - Sep 2018</p>
					</div>
					<p class="text-sm text-base-content/80">Software Engineer Intern</p>
					<p class="mt-2 text-sm text-base-content/80">
						Developed the insurance recommendation feature in Node.js and Javascript, which returned
						top 5 insurance policies stored in MongoDB based on the user’s circumstances input in
						the React app.
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- projects -->
	<div class="flex min-h-[30vh] items-center">
		<div class="w-full">
			<h2 class="text-2xl font-extrabold text-primary">Projects</h2>
			<div class="mt-12 w-full space-y-8">
				<div class="w-full">
					<div class="flex justify-between">
						<h3 class="text-lg font-extrabold">Cornlet</h3>
						<p class="text-sm font-medium text-base-content/80">Jun 2020 - Current</p>
					</div>
					<p class="mt-1 text-sm text-base-content/80">Sole founder, software engineer</p>
					<p class="text-sm text-base-content/80">12,000+ users</p>
				</div>
				<div class="w-full">
					<div class="flex justify-between">
						<h3 class="text-lg font-extrabold">Revy</h3>
						<p class="text-sm font-medium text-base-content/80">Aug 2023 - Current</p>
					</div>
					<p class="mt-1 text-sm text-base-content/80">Lead software engineer</p>
				</div>
			</div>
		</div>
	</div>

	<!-- contact -->
	<div class="flex min-h-[50vh] items-center">
		<div class="w-full">
			<h2 class="text-2xl font-extrabold text-primary">Contact</h2>
			<div class="mt-4">
				<a class="link" href="https://www.linkedin.com/in/jay-joo-341191135/" target="_blank"
					>LinkedIn</a
				>
			</div>
		</div>
	</div>
</PageContainer>

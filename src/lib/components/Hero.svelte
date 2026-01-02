<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { isMobile } from '$lib/global.svelte';
</script>

<section
	class="relative grid h-screen w-full grid-cols-1 items-center
bg-background bg-[url('/images/injera.webp')] bg-cover bg-center px-4 py-4 text-secondary lg:h-[95vh] lg:grid-cols-2 lg:bg-none lg:px-32"
>
	<div class="absolute top-0 left-0 z-0 block h-screen w-full bg-black/50 lg:hidden"></div>
	<div class="z-1 flex w-full flex-col gap-6">
		<h1 class="text-center font-bold text-white lg:text-start lg:text-secondary dark:text-white">
			Welcome to St. Gabriel Ethiopian Delicatessen
		</h1>
		<p
			class="text-center lg:text-start lg:text-accent dark:text-gray-200!
	 {isMobile() ? 'dark:text-gray-200!! text-gray-200' : 'text-gray-800! dark:text-gray-200!'} "
		>
			Experience the warmth and tradition of Ethiopian cuisine, crafted with love and served with
			care.
		</p>
		<div class="flex justify-center gap-4 lg:justify-start">
			<Button size="lg" href="/booking">Book a Table</Button>
			<Button variant="outline" href="/about" size="lg">Learn More</Button>
		</div>
	</div>
	<div class="hidden items-center justify-end lg:flex">
		<img
			src="/images/hero.webp"
			alt="St. Gabriel's Church"
			class="-mb-48 h-auto w-lg max-w-md rounded lg:max-w-full"
		/>
	</div>
</section>

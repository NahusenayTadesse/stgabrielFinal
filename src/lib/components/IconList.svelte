<script>
	import { MapPin, ClockFading, ClipboardClock } from '@lucide/svelte';

	let items = [
		{
			icon: MapPin,
			text: 'Locate Us',
			description: '154 Newington butts, Kennington, London SE11 4RN'
		},
		{ icon: ClockFading, text: 'Open Hours', description: 'Mon To Fri 9:00 AM - 9:00 PM' },
		{ icon: ClipboardClock, text: 'Reservation', description: 'stgabrielcafe@yahoo.com' }
	];
</script>

<div class="mt-16 flex w-full flex-col gap-10 justify-self-center px-6 lg:mt-40 lg:w-9/10 lg:px-0">
	<ul class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		{#each items as item}
			<li
				class="flex flex-row items-start gap-2 rounded-lg border-gray-200 p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg lg:items-start"
			>
				<item.icon
					size="48"
					class=" mb-2 rounded-full bg-secondary p-2 text-white dark:text-white"
				/>

				<div class="flex flex-col gap-1">
					<h4 class="font-semibold text-secondary dark:text-white">{item.text}</h4>
					<p class="text-gray-600 dark:text-white">{item.description}</p>
				</div>
			</li>
		{/each}
	</ul>

	<div class="mt-20 grid grid-cols-1 items-start justify-between gap-16 rounded-lg lg:grid-cols-2">
		<img src="/images/image.webp" alt="" class="rounded-lg" />
		<div class="">
			<h4 class="text-foreground">The Story</h4>
			<p class="text-foreground">
				At St. Gabriel Ethiopian Delicatessen, our journey began with a passion for sharing the
				vibrant flavors and rich traditions of Ethiopia with the world. From our humble beginnings,
				we've grown into a beloved spot in London, where the community comes together to enjoy
				authentic, healthy, and delicious meals. Every dish we serve is a tribute to our heritage,
				crafted with the freshest ingredients and a deep respect for the culinary arts of our
				homeland.
			</p>
		</div>
	</div>
</div>

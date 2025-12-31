<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { LeafIcon, FlameIcon, Loader } from '@lucide/svelte';

	import MenuItemCard from './menu-item-card.svelte';
	import MenuCategory from './menu-category.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Menu</title>
</svelte:head>

<div class="min-h-screen">
	<!-- Hero Section -->
	<HeroSection
		title="Our Menu"
		subtitle="Authentic Ethiopian Flavors"
		description="Discover the rich tastes of Ethiopia with our carefully crafted dishes, made from traditional recipes and the finest ingredients."
		imageSrc="/images/photo (4).webp"
	/>

	<!-- Menu Categories -->
	<section class="py-16">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="mb-12 text-center">
				<Badge variant="secondary" class="mb-4">Traditional Cuisine</Badge>
				<h2 class="mb-6 text-3xl font-bold">Taste of Ethiopia</h2>
				<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
					Each dish tells a story of our heritage, prepared with authentic spices and traditional
					cooking methods.
				</p>
			</div>

			{#await data}
				<div class="flex h-screen items-center justify-center">
					<div class="flex animate-pulse flex-row gap-4 text-center text-4xl">
						<Loader class="h-16 w-16 animate-spin" /> Loading Menu...
					</div>
				</div>
			{:then menu}
				<div class="space-y-12">
					{#each data?.category as category}
						<MenuCategory {category} />

						<div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
							{#each data.menuList.filter((item) => item.category === category.title) as item}
								<MenuItemCard {item} />
							{/each}
						</div>
					{/each}
				</div>
			{/await}
		</div>
	</section>

	<!-- Special Notice -->
	<section class="bg-muted/30 py-16">
		<div class="container mx-auto max-w-4xl px-4">
			<Card class="border-primary/20 bg-linear-to-r from-primary/10 to-accent/10">
				<CardHeader class="text-center">
					<CardTitle class="text-2xl">Book a Tablen</CardTitle>
					<CardDescription>We cater to various dietary preferences</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4 text-center">
					<div class="flex flex-wrap justify-center gap-4">
						<Button variant="secondary" class="flex items-center gap-1" href="/booking">
							<LeafIcon class="h-3 w-3" />
							Book A Table
						</Button>
						<Button variant="secondary" class="flex items-center gap-1" href="/contact">
							<FlameIcon class="h-3 w-3" />
							Contact Us
						</Button>
					</div>
					<p class="text-muted-foreground">
						Please inform our staff of any allergies or dietary requirements. We're happy to
						accommodate your needs.
					</p>
				</CardContent>
			</Card>
		</div>
	</section>
</div>

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
	import { LeafIcon, FlameIcon } from '@lucide/svelte';

	import MenuCategory from './menu-category.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';

	const menuCategories = [
		{
			title: 'Traditional Mains',
			description: 'Authentic Ethiopian dishes served with injera bread',
			items: [
				{
					name: 'Doro Wat',
					description:
						"Ethiopia's national dish - tender chicken in berbere spice sauce with hard-boiled eggs",
					price: '£16.50',
					spicy: true,
					vegetarian: false
				},
				{
					name: 'Kitfo',
					description: 'Ethiopian steak tartare seasoned with mitmita spice and clarified butter',
					price: '£18.00',
					spicy: true,
					vegetarian: false
				},
				{
					name: 'Lamb Tibs',
					description: 'Sautéed lamb with onions, peppers, and aromatic Ethiopian spices',
					price: '£17.50',
					spicy: false,
					vegetarian: false
				},
				{
					name: 'Fish Gulash',
					description: 'Fresh fish cooked in tomato-based sauce with berbere and vegetables',
					price: '£15.50',
					spicy: true,
					vegetarian: false
				}
			]
		},
		{
			title: 'Vegetarian Delights',
			description: 'Plant-based dishes rich in flavor and tradition',
			items: [
				{
					name: 'Vegetarian Combination',
					description: 'A selection of lentils, vegetables, and legumes served on injera',
					price: '£14.00',
					spicy: false,
					vegetarian: true
				},
				{
					name: 'Shiro Wat',
					description: 'Ground chickpea stew with berbere spice and onions',
					price: '£12.50',
					spicy: true,
					vegetarian: true
				},
				{
					name: 'Gomen',
					description: 'Collard greens sautéed with garlic, ginger, and spices',
					price: '£10.50',
					spicy: false,
					vegetarian: true
				},
				{
					name: 'Misir Wat',
					description: 'Red lentils cooked in berbere sauce with aromatic spices',
					price: '£11.00',
					spicy: true,
					vegetarian: true
				}
			]
		},
		{
			title: 'Coffee & Beverages',
			description: 'Traditional Ethiopian coffee and refreshing drinks',
			items: [
				{
					name: 'Ethiopian Coffee Ceremony',
					description: 'Traditional coffee service with three rounds: Abol, Tona, and Baraka',
					price: '£8.00',
					spicy: false,
					vegetarian: true
				},
				{
					name: 'Honey Wine (Tej)',
					description: 'Traditional Ethiopian mead made with honey and gesho',
					price: '£6.50',
					spicy: false,
					vegetarian: true
				},
				{
					name: 'Fresh Mango Juice',
					description: 'Freshly squeezed tropical mango juice',
					price: '£4.50',
					spicy: false,
					vegetarian: true
				},
				{
					name: 'Spiced Tea',
					description: 'Aromatic blend of Ethiopian spices and black tea',
					price: '£3.50',
					spicy: false,
					vegetarian: true
				}
			]
		}
	];
</script>

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

			<div class="space-y-12">
				{#each menuCategories as category}
					<MenuCategory {category} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Special Notice -->
	<section class="bg-muted/30 py-16">
		<div class="container mx-auto max-w-4xl px-4">
			<Card class="border-primary/20 bg-linear-to-r from-primary/10 to-accent/10">
				<CardHeader class="text-center">
					<CardTitle class="text-2xl">Dietary Information</CardTitle>
					<CardDescription>We cater to various dietary preferences</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4 text-center">
					<div class="flex flex-wrap justify-center gap-4">
						<Badge variant="secondary" class="flex items-center gap-1">
							<LeafIcon class="h-3 w-3" />
							Vegetarian Options
						</Badge>
						<Badge variant="secondary" class="flex items-center gap-1">
							<FlameIcon class="h-3 w-3" />
							Spice Levels Available
						</Badge>
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

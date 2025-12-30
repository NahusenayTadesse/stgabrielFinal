<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
	import MenuItemCard from "./menu-item-card.svelte";

	interface MenuItem {
		name: string;
		description: string;
		price: string;
		spicy: boolean;
		vegetarian: boolean;
	}

	interface MenuCategory {
		title: string;
		description: string;
		items: MenuItem[];
	}

	interface Props {
		category: MenuCategory;
	}

	let { category }: Props = $props();
</script>

<div class="space-y-6">
	<div class="text-center">
		<h3 class="text-2xl font-bold mb-2">{category.title}</h3>
		<p class="text-muted-foreground">{category.description}</p>
	</div>

	<div class="grid md:grid-cols-2 gap-4">
		{#each category.items as item}
			<MenuItemCard {item} />
		{/each}
	</div>
</div>

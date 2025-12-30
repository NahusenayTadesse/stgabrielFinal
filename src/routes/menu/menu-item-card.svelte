<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { LeafIcon, FlameIcon } from '@lucide/svelte';

	interface MenuItem {
		name: string;
		description: string;
		price: string;
		spicy: boolean;
		vegetarian: boolean;
	}

	interface Props {
		item: MenuItem;
	}

	let { item }: Props = $props();
</script>

<Card class="transition-shadow hover:shadow-md">
	<CardHeader class="pb-3">
		<div class="flex items-start justify-between gap-4">
			<div class="flex-1">
				<CardTitle class="flex items-center gap-2 text-lg">
					{item.name}
					<div class="flex gap-1">
						{#if item.vegetarian}
							<LeafIcon class="h-4 w-4 text-green-600" />
						{/if}
						{#if item.spicy}
							<FlameIcon class="h-4 w-4 text-red-500" />
						{/if}
					</div>
				</CardTitle>
			</div>
			<Badge variant="secondary" class="font-semibold ">
				{item.price}
			</Badge>
		</div>
	</CardHeader>
	<CardContent>
		<CardDescription class="text-sm leading-relaxed">
			{item.description}
		</CardDescription>
	</CardContent>
</Card>

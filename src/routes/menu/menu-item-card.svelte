<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { formatGBP } from '$lib/global.svelte';

	interface MenuItem {
		name: string;
		description: string;
		price: string;
		category: string;
	}

	interface Props {
		item: MenuItem;
	}

	let { item }: Props = $props();
</script>

<Card
	class="rounded-2xl border border-white/40 bg-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
         backdrop-blur-lg
         transition-all duration-300
         hover:bg-white/40 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.25)]"
>
	<CardHeader class="pb-3">
		<div class="flex items-start justify-between gap-4">
			<div class="flex-1">
				<CardTitle class="flex items-center gap-2 text-lg">
					{item.name}
				</CardTitle>
			</div>
			<Badge variant="secondary" class="font-semibold ">
				{formatGBP(item.price)}
			</Badge>
		</div>
	</CardHeader>
	<CardContent>
		<CardDescription class="text-sm leading-relaxed">
			{item.description}
		</CardDescription>
	</CardContent>
</Card>

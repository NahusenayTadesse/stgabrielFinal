<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
	import type { Icon } from "@lucide/svelte";

	interface ContactInfo {
		icon: Icon;
		title: string;
		details: string[];
	}

	interface Props {
		info: ContactInfo;
	}

	let { info }: Props = $props();
</script>

<Card class="text-center hover:shadow-md transition-shadow">
	<CardHeader>
		<div class="w-12 h-12 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
			<info.icon class="w-6 h-6 text-white" />
		</div>
		<CardTitle>{info.title}</CardTitle>
	</CardHeader>
	<CardContent class="space-y-2">
		{#each info.details as detail}
			<CardDescription class="text-base">
				{detail}
			</CardDescription>
		{/each}
	</CardContent>
</Card>

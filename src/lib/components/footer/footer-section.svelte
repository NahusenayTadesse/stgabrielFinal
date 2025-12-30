<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		title: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="space-y-8">
	<h3 class="font-semibold text-lg mb-4">{title}</h3>
	{@render children()}
</div>

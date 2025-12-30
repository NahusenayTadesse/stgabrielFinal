<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@lucide/svelte";

	const socialLinks = [
		{ icon: FacebookIcon, href: "#", label: "Facebook" },
		{ icon: InstagramIcon, href: "#", label: "Instagram" },
		{ icon: TwitterIcon, href: "#", label: "Twitter" },
		{ icon: YoutubeIcon, href: "#", label: "YouTube" },
	];
</script>

<div class="flex gap-2">
	{#each socialLinks as social}
		<Button variant="outline" size="sm" class="p-2">
			<social.icon class="w-4 h-4" />
			<span class="sr-only">{social.label}</span>
		</Button>
	{/each}
</div>
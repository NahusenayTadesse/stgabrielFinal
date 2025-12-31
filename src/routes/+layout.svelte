<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import '../app.css';
	import { getFlash } from 'sveltekit-flash-message';
	import { page, updated } from '$app/state';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { toastmsg } from '$lib/global.svelte';

	const flash = getFlash(page, { clearAfterMs: 5000 });

	import { ModeWatcher } from 'mode-watcher';
	import { fly } from 'svelte/transition';

	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	async function notifyBrowser(title: string, body: string) {
		if (!('Notification' in window)) return; // Safari iOS etc.
		if (Notification.permission === 'granted') {
			new Notification(title, { body, icon: '/logo.png' });
		} else if (Notification.permission !== 'denied') {
			const perm = await Notification.requestPermission();
			if (perm === 'granted') new Notification(title, { body, icon: '/logo.png' });
		}
	}

	let { children } = $props();

	async function requestNotificationPermission() {
		if (!('Notification' in window)) return;
		await Notification.requestPermission();
	}

	// let iconify = $state('h-6 w-6 animate-ping');

	$effect(() => {
		if (!$flash) return;
		if (page.data.flash?.type === 'success') toast.success($flash.message);
		if (page.data.flash?.type === 'error') toast.error($flash?.message);
		if (Notification.permission === 'granted') {
			notifyBrowser(
				page.data.flash?.type === 'success'
					? 'Success'
					: page.data.flash?.type === 'error'
						? 'Error'
						: 'Message',
				$flash.message
			);
		}
		$flash = undefined;
	});
</script>

<svelte:head>
	<link rel="icon" href="/logo.png" />
	<meta
		name="description"
		content="St. Gabriel Ethiopian Delicatessen in London serves authentic, healthy Ethiopian cuisine made with fresh ingredients. A welcoming community spot celebrating rich tradition and bold flavors."
	/>
	<meta
		name="keywords"
		content="Ethiopian restaurant London, Ethiopian food London, Ethiopian cafe Kennington, injera London, healthy African cuisine, St Gabriel Cafe"
	/>
	<meta name="author" content="St Gabriel Cafe" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://saintgabrielcafe.com/" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="restaurant" />
	<meta
		property="og:title"
		content="St. Gabriel Ethiopian Delicatessen | Authentic Ethiopian Cuisine in London"
	/>
	<meta
		property="og:description"
		content="Experience vibrant Ethiopian flavors at St. Gabriel Ethiopian Delicatessen in London. Authentic dishes crafted with fresh ingredients and tradition."
	/>
	<meta property="og:url" content="https://saintgabrielcafe.com/" />
	<meta property="og:image" content="/images/injera.webp" />
	<meta property="og:site_name" content="St Gabriel Cafe" />
	<meta property="og:locale" content="en_GB" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="St. Gabriel Ethiopian Delicatessen | Authentic Ethiopian Cuisine in London"
	/>
	<meta
		name="twitter:description"
		content="Authentic Ethiopian cuisine in London. Fresh, healthy dishes inspired by rich Ethiopian tradition."
	/>
	<meta name="twitter:image" content="/images/injera.webp" />

	<!-- Contact / Business Info -->
	<meta name="geo.region" content="GB-LND" />
	<meta name="geo.placename" content="London" />
	<meta name="geo.position" content="51.4880;-0.1050" />
	<meta name="ICBM" content="51.4880, -0.1050" />
</svelte:head>

{#if !page.url.pathname.startsWith('/dashboard')}
	<Header />
{/if}

{@render children()}

{#if !page.url.pathname.startsWith('/dashboard')}
	<Footer />
{/if}
<ModeWatcher />
<Toaster position="bottom-right" richColors closeButton />

<!-- {#if navigating.to}
	<div
		class="fixed top-0.5 right-0.5 bottom-0.5 left-0.5 z-1 flex w-auto flex-col items-center justify-center"
	>
		<div class="flex flex-row items-center gap-2">
			<Loader class="h-12 w-12 animate-spin" />
			<h2 class="animate-pulse capitalize">Loading...</h2>
		</div>
	</div>
{/if} -->

<ProgressBar class="text-accent" />

{#if updated.current}
	<div class={toastmsg} transition:fly={{ x: 20, duration: 300 }}>
		<p>
			A new version of the app is available

			<Button onclick={() => location.reload()}>Reload the page</Button>
		</p>
	</div>
{/if}

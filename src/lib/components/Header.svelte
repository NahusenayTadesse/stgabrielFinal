<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon, XIcon } from '@lucide/svelte';
	import DarkMode from './DarkMode.svelte';

	interface Props {
		currentPage: string;
		setPage: (page: string) => void;
	}

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	interface Props {
		currentPage: string;
		setPage: (page: string) => void;
		mobile?: boolean;
	}

	const navItems = [
		{ id: '/', label: 'Home' },
		{ id: '/about', label: 'About' },
		{ id: '/menu', label: 'Menu' },
		{ id: '/contact', label: 'Contact' },
		{ id: '/booking', label: 'Book Table' }
	];
</script>

<nav
	class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
>
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 transition-opacity hover:opacity-80">
				<img src="/Logo.svg" alt="St. Gabriel Logo" class="block h-8 w-12 dark:hidden" />
				<img src="/logo.png" alt="St. Gabriel Logo" class="hidden h-8 w-12 dark:block" />
				<span class="text-xl font-bold">St. Gabriel</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex">
				<div class="flex {mobileMenuOpen ? 'flex-col gap-2' : 'items-center gap-1'}">
					{#each navItems as item}
						<Button
							href={item.id}
							variant={page.url.pathname === item.id ? 'default' : 'ghost'}
							size="sm"
							class={mobileMenuOpen ? 'justify-start' : ''}
						>
							{item.label}
						</Button>
					{/each}
					<DarkMode />
				</div>
			</div>

			<!-- Mobile Menu Button -->
			<Button variant="ghost" size="sm" class="md:hidden" onclick={toggleMobileMenu}>
				{#if mobileMenuOpen}
					<XIcon class="h-5 w-5" />
				{:else}
					<MenuIcon class="h-5 w-5" />
				{/if}
			</Button>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="border-t py-4 md:hidden">
				<div class="flex {mobileMenuOpen ? 'flex-col gap-2' : 'items-center gap-1'}">
					{#each navItems as item}
						<Button
							variant={page.url.pathname === item.id ? 'default' : 'ghost'}
							size="sm"
							class={mobileMenuOpen ? 'justify-start' : ''}
							href={item.id}
						>
							{item.label}
						</Button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</nav>

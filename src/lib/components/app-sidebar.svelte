<script lang="ts">
	import { User, Calendar, MessageSquareMore, Utensils, LayoutDashboard } from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { page } from '$app/state';
	import { bgGradient, selectItem } from '$lib/global.svelte';
	import { fade } from 'svelte/transition';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	const navigation = [
		{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
		{ title: 'Bookings', url: '/dashboard/bookings', icon: Calendar },
		{ title: 'Menu', url: '/dashboard/menu', icon: Utensils },
		{ title: 'Messages', url: '/dashboard/messages', icon: MessageSquareMore },
		{ title: 'Users', url: '/dashboard/users', icon: User }
	];

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const on = 'bg-sidebar-primary text-sidebar-primary-foreground';
	const off = 'text-sidebar-foreground';
	function blacken(url: string) {
		const currentPath = page.url.pathname;

		// Special case for root dashboard
		if (url === '/dashboard') {
			return currentPath === '/dashboard' ? on : off;
		}

		// For other items, check if current path starts with their URL but is not just /dashboard
		return currentPath.startsWith(url) && currentPath !== '/dashboard' ? on : off;
	}

	let open = $state(false);

	const sidebar = useSidebar();

	function closeSidebar() {
		if (sidebar.isMobile) {
			sidebar.setOpenMobile(false);
		}
	}
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel class="py-4">
				<div class="flex flex-row items-center justify-center gap-4 py-8">
					<img src="/Logo.svg" class="block h-8 w-8 dark:hidden" alt="Logo" />
					<img src="/logo.png" class="hidden h-8 w-8 dark:block" alt="Logo" />
					<h4 class="!text-[22px] text-gray-900 dark:text-white">St Gabriel Cafe</h4>
				</div></Sidebar.GroupLabel
			>
			<Sidebar.GroupContent class="mt-8">
				<Sidebar.Menu class="w-full gap-3">
					{#each navigation as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								class="flex items-center gap-3 rounded-lg px-3 py-5 text-lg
          font-normal transition-colors duration-300 hover:bg-sidebar-accent
          hover:text-sidebar-accent-foreground {selectItem}
          {blacken(item.url)}"
							>
								{#snippet child({ props })}
									<a href={item.url} onclick={closeSidebar} {...props} transition:fade>
										<item.icon class="!h-5 !w-5" />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<!-- <Sidebar.Footer class="flex flex-row bg-white dark:bg-black">
		<Sidebar.GroupLabel>
			Powered By <a href="https://sunamarketing.com" target="_blank" class="ml-1">Suna Marketing</a>
		</Sidebar.GroupLabel>
	</Sidebar.Footer> -->
</Sidebar.Root>

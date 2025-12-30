<script>
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CalendarArrowDown, Plus, Sheet } from '@lucide/svelte';
	let { children } = $props();

	let today = new Date().toLocaleDateString('en-CA');
</script>

<div class="mb-8 flex flex-row flex-wrap justify-start gap-4">
	<Button
		href="/dashboard/bookings/{today}"
		variant={page.url.pathname.endsWith(today) &&
		!page.url.pathname.includes('/dashboard/bookings/all-appointments')
			? 'default'
			: 'outline'}
		><CalendarArrowDown /> Today
	</Button>
	<Button
		href="/dashboard/bookings/all-appointments"
		variant={page.url.pathname.includes('/dashboard/bookings/all-appointments')
			? 'default'
			: 'outline'}><Sheet />All Bookings</Button
	>
</div>

{@render children()}

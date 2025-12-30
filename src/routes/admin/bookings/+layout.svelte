<script>
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CalendarArrowDown, Plus, Sheet } from '@lucide/svelte';
	let { children } = $props();

	let today = new Date().toLocaleDateString('en-CA');
</script>

<div class="mb-8 flex flex-row justify-start gap-4">
	<Button
		href="/dashboard/appointments/{today}"
		variant={page.url.pathname.includes(today) ? 'default' : 'outline'}
		><CalendarArrowDown /> Today
	</Button>
	<Button
		href="/dashboard/appointments/all-appointments"
		variant={page.url.pathname === '/admin/bookings/all-appointments' ? 'default' : 'outline'}
		><Sheet />All Appointments</Button
	>
</div>

{@render children()}

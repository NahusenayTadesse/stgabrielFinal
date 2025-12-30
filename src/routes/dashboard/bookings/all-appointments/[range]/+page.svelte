<script lang="ts">
	import { columns } from './columns';

	let { data } = $props();

	import DataTable from '$lib/components/Table/data-table.svelte';

	import { getLocalTimeZone, today } from '@internationalized/date';

	import { CalendarDate } from '@internationalized/date';
	import { page } from '$app/state';

	import { Frown } from '@lucide/svelte';
	import DateMonth from '$lib/formComponents/DateMonth.svelte';

	let todayDate = today(getLocalTimeZone());
	let value = $state<CalendarDate | undefined>(todayDate);
	let urlDate = $state(page.url.pathname.split('/').pop() || today(getLocalTimeZone()).toString());
	const [year, month, day] = urlDate.split('-').map(Number);

	let placeholder = $derived(todayDate);
	let open = $state(false);
</script>

<svelte:head>
	<title>Bookings on {placeholder}</title>
</svelte:head>
<div>
	<DateMonth start={data?.start} end={data?.end} link="/dashboard/bookings/all-appointments" />
</div>
<!-- <div class="lg:w-full w-4/5 mt-8">
 {#if data.appointmentsList.length === 0}
   <p class="text-center">No appointments for this date.</p>
 {:else}
 <ChildrenTable {tableHeaders} mainlist={data.appointmentsList} search={true} link="appointments/single"  />
  {/if}
 </div> -->
{#if data.appointmentsList.length === 0}
	<div class="flex h-96 w-5xl items-center justify-center">
		<p class="justify-self-cente mt-4 flex flex-row gap-4 text-center text-4xl">
			<Frown class="h-12 w-16  animate-bounce" />
			No bookings for this date range, try another date range.
		</p>
	</div>
{:else}
	<h2 class="my-4 text-2xl">No of appointments {data.appointmentsList?.length}</h2>

	<div class="mt-8 mb-4 w-[350px] p-2 pt-4 lg:w-full lg:p-0">
		<DataTable data={data.appointmentsList} {columns} />
	</div>
{/if}

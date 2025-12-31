<script>
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import DialogComp from '$lib/components/DialogComp.svelte';
	import Dialog from './dialog.svelte';
	// import AddCustomer from "$lib/forms/AddCustomer.svelte";
	import { Plus } from '@lucide/svelte';
	let { data, children } = $props();
</script>

<div class="mb-8 flex flex-row items-center justify-start gap-2">
	<Button variant="default" href="/dashboard/menu">Menu</Button>
	<Button variant="default" href="/dashboard/menu/categories">Categories</Button>
	<DialogComp title="+ Add New Menu Item" variant="default">
		<Dialog data={data?.form} category={data?.category} action={'/dashboard/menu?/addMenu'} />
	</DialogComp>

	<!-- <DialogComp title="Add New Customer" {content} /> -->
</div>

<!-- {#snippet content()}

  <AddCustomer data={data?.form} action="/dashbaord/customers?/addCustomer" />

{/snippet} -->

{@render children?.()}

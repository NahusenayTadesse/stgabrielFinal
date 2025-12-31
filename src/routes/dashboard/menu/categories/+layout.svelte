<script>
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import DialogComp from '$lib/components/DialogComp.svelte';
	import Dialog from './dialog.svelte';
	// import AddCustomer from "$lib/forms/AddCustomer.svelte";
	let { data, children } = $props();
</script>

<div class="mb-8 flex flex-row items-center justify-start gap-2">
	<DialogComp title="+ Add Category" variant="default">
		<Dialog data={data?.form} action={'/dashboard/menu/categories?/addCategory'} />
	</DialogComp>

	<!-- <DialogComp title="Add New Customer" {content} /> -->
</div>

<!-- {#snippet content()}

  <AddCustomer data={data?.form} action="/dashbaord/customers?/addCustomer" />

{/snippet} -->

{@render children?.()}

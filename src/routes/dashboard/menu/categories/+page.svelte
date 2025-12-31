<script lang="ts">
	let { data } = $props();

	import DataTable from '$lib/components/Table/data-table.svelte';

	import Loading from '$lib/components/Loading.svelte';
	import { Frown, Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import EditMenu from './editMenu.svelte';
	import Delete from './delete.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';

	const columns = [
		{
			accessorKey: 'index',
			header: '#',
			cell: (info) => info.row.index + 1,
			sortable: false
		},
		{
			accessorKey: 'name',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Name',

					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				return renderComponent(EditMenu, {
					data: data.editForm,
					action: '?/editCategory',
					id: row.original.id,
					name: row.original.name,
					description: row.original.description
				});
			}
		},

		{
			accessorKey: 'description',
			header: 'Description'
		},
		{
			accessorKey: 'name',
			header: 'Edit',
			sortable: true,
			cell: ({ row }) => {
				return renderComponent(EditMenu, {
					data: data.editForm,
					action: '?/editCategory',
					id: row.original.id,
					name: row.original.name,
					description: row.original.description,
					icon: true
				});
			}
		},

		{
			accessorKey: 'name',
			header: 'Delete',
			sortable: true,
			cell: ({ row }) => {
				return renderComponent(Delete, {
					data: data.deleteForm,
					action: '?/deleteMenu',
					id: row.original.id,
					name: row.original.name
				});
			}
		}
	];
</script>

<svelte:head>
	<title>Menu List</title>
</svelte:head>

{#await data}
	<Loading name="Menu" />
{:then customerList}
	{#if data.userList.length === 0}
		<div class="flex h-96 w-full flex-col items-center justify-center lg:w-5xl">
			<p class="justify-self-cente mt-4 flex flex-row gap-4 text-center text-4xl">
				<Frown class="h-12 w-16  animate-bounce" />
				Menu List is Empty
			</p>
		</div>
	{:else}
		<h2 class="my-4 text-2xl">No of Categories {data.userList?.length}</h2>

		<div class="mt-8 mb-4 w-[350px] p-0 pt-4 lg:w-full lg:p-0">
			<DataTable data={data.userList} {columns} />
		</div>
	{/if}
{:catch}
	<div class="flex h-screen w-screen flex-col items-center justify-center">
		<h1 class="text-red-500">Unexpected Error: Reload</h1>
	</div>
{/await}

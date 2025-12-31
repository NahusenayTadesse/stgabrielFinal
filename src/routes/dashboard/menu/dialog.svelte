<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	// import { zod4Client } from "sveltekit-superforms/adapters";
	import type { Menu } from './schema';
	// import { createRoleSchema } from "$lib/ZodSchema";
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import SelectComp from '$lib/formComponents/SelectComp.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	type Category = {
		value: number;
		name: string;
	};

	let {
		data,
		action = '/dashboard/customers?/addCustomer',
		category = [{ value: 0, name: 'Something' }]
	}: {
		data: SuperValidated<Infer<Menu>>;
		action: string;
		category: Category[];
	} = $props();

	const { form, errors, enhance, delayed, message, allErrors } = superForm(data, {});

	import { toast } from 'svelte-sonner';
	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});
</script>

{#snippet fe(
	label = '',
	name = '',
	type = '',
	placeholder = '',
	required = false,
	textarea = false,
	min = '',
	max = ''
)}
	<div class="flex w-full flex-col justify-start gap-2">
		<Label for={name}>{label}</Label>
		{#if textarea}
			<Textarea
				{name}
				{placeholder}
				{required}
				bind:value={$form[name]}
				aria-invalid={$errors[name] ? 'true' : undefined}
			/>
		{:else}
			<Input
				{type}
				{name}
				{placeholder}
				{required}
				{min}
				{max}
				bind:value={$form[name]}
				aria-invalid={$errors[name] ? 'true' : undefined}
			/>
		{/if}
		{#if $errors[name]}
			<span class="text-red-500">{$errors[name]}</span>
		{/if}
	</div>
{/snippet}
{#snippet selects(name, items)}
	<div class="flex w-full flex-col justify-start gap-2">
		<Label for={name} class="capitalize">{name.replace(/([a-z])([A-Z])/g, '$1 $2')}:</Label>

		<SelectComp {name} bind:value={$form[name]} {items} />
		{#if $errors[name]}<span class="text-red-500">{$errors[name]}</span>{/if}
	</div>
{/snippet}

<form {action} use:enhance method="post" id="edit" class="flex w-full flex-col gap-4 p-4">
	<Errors allErrors={$allErrors} />
	{@render fe('Food Name', 'name', 'text', 'Enter Food Item Name', true)}
	{@render fe('Price', 'price', 'number', 'Enter Price', true)}
	{@render selects('category', category)}
	{@render fe('Food Description', 'description', 'textarea', 'Description', true, true)}

	<Button type="submit" class="mt-4" form="edit">
		{#if $delayed}
			<LoadingBtn name="Adding Menu Item" />
		{:else}
			<Plus class="h-4 w-4" />

			Add Menu Item
		{/if}
	</Button>
</form>

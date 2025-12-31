<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { Edit, Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { CategoryUpdate } from './schema';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import SelectComp from '$lib/formComponents/SelectComp.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	type Category = {
		value: number;
		name: string;
	};

	let {
		data,
		action = '/dashboard/customers?/addCustomer',
		id,
		name,

		description,
		icon = false
	}: {
		data: SuperValidated<Infer<CategoryUpdate>>;
		action: string;
		id: number;
		name: string;

		description: string;
		icon: boolean;
	} = $props();

	const { form, errors, enhance, delayed, message, allErrors } = superForm(data, {
		resetForm: false
	});

	let open = $state(false);

	$form.id = id;
	$form.name = name;
	$form.description = description;

	import { toast } from 'svelte-sonner';
	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
				open = false;
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

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class="{buttonVariants({ variant: 'ghost' })} justify-self-start p-0!">
			<Dialog.Root bind:open>
				<Dialog.Trigger class="w-auto border-0">
					{#if icon}
						<Edit />
					{:else}
						{name}
					{/if}
				</Dialog.Trigger>
				<Dialog.Content class="w-full bg-white">
					<Dialog.Header>
						<Dialog.Title class="text-center text-4xl">Edit {name}</Dialog.Title>
					</Dialog.Header>
					<form {action} use:enhance method="post" id="edit" class="flex w-full flex-col gap-4 p-4">
						<Errors allErrors={$allErrors} />
						<input type="hidden" name="id" value={$form.id} />
						{@render fe('Category Name', 'name', 'text', 'Enter Category Name', true, true)}

						{@render fe(
							'Category Description',
							'description',
							'textarea',
							'Enter Category Description',
							true,
							true
						)}

						<Button type="submit" class="mt-4" form="edit">
							{#if $delayed}
								<LoadingBtn name="Adding Menu Item" />
							{:else}
								<Plus class="h-4 w-4" />

								Save Changes
							{/if}
						</Button>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Edit {name}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { bookingFeeSchema } from '$lib/zodschemas/appointmentSchema';
	import { editAppointment } from '$lib/ZodSchema';
	import { columns } from './columns';

	let { data } = $props();

	import SingleTable from '$lib/components/SingleTable.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { fileProxy, superForm } from 'sveltekit-superforms/client';
	import ComboboxComp from '$lib/formComponents/ComboboxComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { ArrowLeft, Frown, Pencil, Plus, Save, Trash, Upload, X } from '@lucide/svelte';
	import SelectComp from '$lib/formComponents/SelectComp.svelte';
	import type { Snapshot } from '@sveltejs/kit';
	import DataTable from '$lib/components/Table/data-table.svelte';

	import DatePicker2 from '$lib/formComponents/DatePicker2.svelte';
	import Delete from '$lib/forms/Delete.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import SingleView from '$lib/components/SingleView.svelte';
	import FileUpload from '$lib/formComponents/FileUpload.svelte';

	let singleTable = $derived([
		{ name: 'Name', value: data.appointmentsList.customerName },
		{ name: 'Phone', value: data.appointmentsList.phone },
		{ name: 'Email', value: data.appointmentsList.email },
		{ name: 'Status', value: data.appointmentsList.status },
		{ name: 'Date', value: data.appointmentsList.date },
		{ name: 'Time', value: data.appointmentsList.time },
		{ name: 'Notes', value: data.appointmentsList.notes }
	]);

	const { form, errors, enhance, delayed, capture, restore, message } = superForm(data.form, {
		taintedMessage: () => {
			return new Promise((resolve) => {
				resolve(window.confirm('Do you want to leave?\nChanges you made may not be saved.'));
			});
		},
		validators: zod4Client(bookingFeeSchema)
	});

	const {
		form: editForm,
		errors: editErrors,
		enhance: editEnhance,
		delayed: editDelayed
	} = superForm(data.editForm, {
		validators: zod4Client(editAppointment),
		multipleSubmits: 'allow',
		resetForm: false
	});

	export const snapshot: Snapshot = { capture, restore };

	const paymentStatus = [
		{ value: 'paid', name: 'Full Payment' },
		{ value: 'partially_paid', name: 'Partial Payment' }
	];

	$editForm.customerName = data.appointmentsList.customerName;
	$editForm.phone = data.appointmentsList.phone;
	$editForm.email = data.appointmentsList.email;
	$editForm.appointmentDate = data.appointmentsList.date;
	$editForm.appointmentTime = data.appointmentsList.time;
	$editForm.notes = data.appointmentsList.notes || undefined;

	//   let date = $derived(dateProxy(editForm, 'appointmentDate', { format: 'date'}));

	let edit = $state(false);

	let search = false;

	let date = new Date();

	let redirect = `/dashboard/appointments/${date.toLocaleDateString('en-CA')}`;
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

<svelte:head>
	<title>Booking Details</title>
</svelte:head>

{#if data.appointmentsList.customerName}
	<SingleView title="Booking Details">
		<div class="mt-4 flex w-full flex-row items-start justify-start gap-2 pl-4">
			<Button onclick={() => (edit = !edit)}>
				{#if !edit}
					<Pencil class="h-4 w-4" />
					Edit
				{:else}
					<ArrowLeft class="h-4 w-4" />

					Back
				{/if}
			</Button>
			<Delete {redirect} />
		</div>
		{#if edit === false}
			<div class="w-full p-4"><SingleTable {singleTable} /></div>
		{/if}
		{#if edit}
			<div class="w-full p-4">
				<form
					action="?/editAppointment"
					use:editEnhance
					class="flex flex-col gap-4"
					id="edit"
					method="post"
				>
					{@render fe2('Customer Name', 'customerName', 'text', 'Enter Customer Name', true)}
					{@render fe2('Phone', 'phone', 'text', 'Enter Phone Number', true)}
					{@render fe2('Email', 'email', 'email', 'Enter Email Address', true)}

					<DatePicker2 bind:data={$editForm.date} />
					<input type="hidden" name="date" bind:value={$editForm.date} id="" />

					{#if $editErrors.appointmentDate}
						<span class="text-red-500">{$editErrors.date}</span>
					{/if}

					{@render fe2('Appointment Time', 'time', 'time', '', true)}
					{@render fe2('Notes', 'notes', 'text', '')}
					<Button form="edit" type="submit" class="mt-4">
						{#if $editDelayed}
							<LoadingBtn name="Saving Changes" />
						{:else}
							<Save class="h-4 w-4" />
							Save Changes
						{/if}
					</Button>
				</form>
			</div>
		{/if}
	</SingleView>

	{#snippet fe(
		label = '',
		name = '',
		type = '',
		placeholder = '',
		required = false,
		min = '',
		max = ''
	)}
		<div class="flex w-full flex-col justify-start gap-2">
			<Label for={name}>{label}</Label>
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

	{#snippet combo(name, items)}
		<div class="flex w-full flex-col justify-start gap-2">
			<Label for={name} class="capitalize">{name.replace(/([a-z])([A-Z])/g, '$1 $2')}:</Label>

			<ComboboxComp {name} bind:value={$form[name]} {items} />
			{#if $errors[name]}<span class="text-red-500">{$errors[name]}</span>{/if}
		</div>
	{/snippet}

	{#snippet fe2(
		label = '',
		name = '',
		type = '',
		placeholder = '',
		required = false,
		min = '',
		max = ''
	)}
		<div class="flex w-full flex-col justify-start gap-2">
			<Label for={name}>{label}</Label>
			<Input
				{type}
				{name}
				{placeholder}
				{required}
				{min}
				{max}
				bind:value={$editForm[name]}
				aria-invalid={$editErrors[name] ? 'true' : undefined}
			/>
			{#if $editErrors[name]}
				<span class="text-red-500">{$editErrors[name]}</span>
			{/if}
		</div>
	{/snippet}

	{#snippet combo2(name, items)}
		<div class="flex w-full flex-col justify-start gap-2">
			<Label for={name} class="capitalize">{name.replace(/([a-z])([A-Z])/g, '$1 $2')}:</Label>

			<ComboboxComp {name} bind:value={$editForm[name]} {items} />
			{#if $editErrors[name]}<span class="text-red-500">{$editErrors[name]}</span>{/if}
		</div>
	{/snippet}

	<Card.Root class="mt-8 flex w-full flex-col gap-4 lg:w-xl">
		<Card.Header class="mb-4">
			<Card.Title class="text-center text-2xl">Change Booking Status</Card.Title>
		</Card.Header>
		<Card.Content>
			<form
				use:enhance
				method="post"
				class="flex w-full flex-col gap-4 rounded-md border p-4"
				action="?/confirmAppointment"
			>
				{@render selects('status', [
					{ value: 'Pending', name: 'Pending' },
					{ value: 'Confirmed', name: 'Confirmed' },
					{ value: 'Cancelled', name: 'Cancelled' }
				])}

				<Button type="submit" class="mt-4">
					{#if $delayed}
						<LoadingBtn name="Confirming Booking" />
					{:else}
						<Plus class="h-4 w-4" />
						Confirm Bookings
					{/if}
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
{:else}
	<Empty title="appointments" />
{/if}

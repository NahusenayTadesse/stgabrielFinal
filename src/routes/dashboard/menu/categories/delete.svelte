<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { Trash, Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { DeleteMenuItem } from './schema';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import Errors from '$lib/formComponents/Errors.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let {
		data,
		action = '/dashboard/customers?/delete',
		id,
		name
	}: {
		data: SuperValidated<Infer<DeleteMenuItem>>;
		action: string;

		id: number;
		name: string;
	} = $props();

	const { form, errors, enhance, delayed, message, allErrors } = superForm(data, {});

	$form.id = id;

	let open = $state(false);

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

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger
			class="{buttonVariants({ variant: 'destructive', size: 'icon' })} justify-self-start p-0!"
		>
			<Dialog.Root bind:open>
				<Dialog.Trigger class="w-auto border-0">
					<Trash />
				</Dialog.Trigger>
				<Dialog.Content class="w-full bg-white">
					<Dialog.Header>
						<Dialog.Title class="text-center text-4xl"
							>Are you sure you want to delete {name}?</Dialog.Title
						>
					</Dialog.Header>
					<form
						{action}
						use:enhance
						method="post"
						id="edit"
						class="flex w-full flex-row items-end justify-between gap-4 p-4"
					>
						<Errors allErrors={$allErrors} />
						<input type="hidden" name="id" value={$form.id} />

						<Button type="submit" variant="destructive" class="mt-4" form="edit">
							{#if $delayed}
								<LoadingBtn name="DeletingMenu Item" />
							{:else}
								<Trash class="h-4 w-4" />

								Delete {name}
							{/if}
						</Button>
						<Dialog.Close class={buttonVariants({ variant: 'default', size: 'lg' })}
							>Cancel</Dialog.Close
						>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Delete {name}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

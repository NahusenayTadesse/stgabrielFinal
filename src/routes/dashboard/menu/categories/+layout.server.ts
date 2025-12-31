import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { menuCategory } from '$lib/server/db/schema';

import { addCategory as schema, categoryUpdateSchema, deleteMenuItem } from './schema';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async () => {
	const form = await superValidate(zod4(schema));
	const editForm = await superValidate(zod4(categoryUpdateSchema));
	const deleteForm = await superValidate(zod4(deleteMenuItem));
	const category = await db
		.select({
			value: menuCategory.id,
			name: menuCategory.name
		})
		.from(menuCategory);

	return {
		form,
		category,
		editForm,
		deleteForm
	};
};

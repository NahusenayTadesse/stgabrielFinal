import { db } from '$lib/server/db';
import type { PageServerLoad, Actions } from '../$types';
import { menu, menuCategory } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

import { message, superValidate, fail, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { categoryUpdateSchema as schema, addCategory, deleteMenuItem } from './schema';

export const load: PageServerLoad = async () => {
	const userList = await db
		.select({
			id: menuCategory.id,
			name: menuCategory.name,
			description: menuCategory.description
		})
		.from(menuCategory)
		.orderBy(asc(menuCategory.name));

	return {
		userList
	};
};

import { setFlash } from 'sveltekit-flash-message/server';

export const actions: Actions = {
	addCategory: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(addCategory));

		if (!form.valid) {
			setFlash({ type: 'error', message: 'Please check the form for Errors' }, cookies);

			return fail(400, {
				form
			});
		}

		const { name, description } = form.data;

		try {
			await db.insert(menuCategory).values({
				name,
				description
			});

			return message(form, { type: 'success', text: 'Category Successfully Created' });
		} catch (err: any) {
			if (err.code === 'ER_DUP_ENTRY')
				return setError(form, 'name', 'Category Name already exists.');

			return message(form, {
				type: 'error',
				text: err.message
			});
		}
	},
	editCategory: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}

		const { name, description, id } = form.data;

		try {
			await db
				.update(menuCategory)
				.set({
					name,
					description
				})
				.where(eq(menuCategory.id, Number(id)));

			// Stay on the same page and set a flash message

			return message(form, { type: 'success', text: 'Category Updated Successfully' });
		} catch (err) {
			return message(form, { type: 'error', text: 'Category Update Failed ' + err?.message });
		}
	},
	deleteMenu: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(deleteMenuItem));

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(menuCategory).where(eq(menuCategory.id, Number(id)));

			// Stay on the same page and set a flash message

			return message(form, { type: 'success', text: 'Menu Item Deleted Successfully' });
		} catch (err) {
			return message(form, { type: 'error', text: 'Menu Item Delete Failed: ' + err?.message });
		}
	}
};

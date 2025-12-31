import { db } from '$lib/server/db';
import type { PageServerLoad, Actions } from '../$types';
import { menu, menuCategory } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

import { message, superValidate, fail, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { menuUpdateSchema as schema, menuSchema, deleteMenuItem } from './schema';

export const load: PageServerLoad = async () => {
	const userList = await db
		.select({
			id: menu.id,
			name: menu.name,
			price: menu.price,
			category: menuCategory.name,
			categoryId: menu.categoryId,
			description: menu.description
		})
		.from(menu)
		.leftJoin(menuCategory, eq(menu.categoryId, menuCategory.id))
		.orderBy(asc(menu.name));

	return {
		userList
	};
};

import { setFlash } from 'sveltekit-flash-message/server';

export const actions: Actions = {
	addMenu: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(menuSchema));

		if (!form.valid) {
			setFlash({ type: 'error', message: 'Please check the form for Errors' }, cookies);

			return fail(400, {
				form
			});
		}

		const { name, price, category, description } = form.data;

		try {
			await db.insert(menu).values({
				name,
				price,
				categoryId: category,
				description
			});

			return message(form, { type: 'success', text: 'Menu Item Successfully Created' });
		} catch (err: any) {
			if (err.code === 'ER_DUP_ENTRY') return setError(form, 'name', 'Name already exists.');

			return message(form, {
				type: 'error',
				text: err.message
			});
		}
	},
	editMenu: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}

		const { name, description, id, price, category } = form.data;

		try {
			await db
				.update(menu)
				.set({
					name,
					description,
					price: Number(price),
					categoryId: Number(category)
				})
				.where(eq(menu.id, Number(id)));

			// Stay on the same page and set a flash message

			return message(form, { type: 'success', text: 'Menu Updated Successfully' });
		} catch (err) {
			return message(form, { type: 'error', text: 'Menu Update Failed ' + err?.message });
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
			await db.delete(menu).where(eq(menu.id, Number(id)));

			// Stay on the same page and set a flash message

			return message(form, { type: 'success', text: 'Menu Item Deleted Successfully' });
		} catch (err) {
			return message(form, { type: 'error', text: 'Menu Item Delete Failed: ' + err?.message });
		}
	}
};

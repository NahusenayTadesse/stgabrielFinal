import { db } from '$lib/server/db';
import { contactMessages } from '$lib/server/db/schema';
import { setFlash } from 'sveltekit-flash-message/server';
import { eq } from 'drizzle-orm';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const messages = await db
		.select({
			id: contactMessages.id,
			name: contactMessages.name,
			phone: contactMessages.phone,
			email: contactMessages.email,
			date: contactMessages.createdAt,
			subject: contactMessages.subject
		})
		.from(contactMessages);

	return {
		messages
	};
};

export const actions: Actions = {
	delete: async ({ request, cookies }) => {
		try {
			const formData = await request.formData();
			const id = formData.get('id');
			await db.delete(contactMessages).where(eq(contactMessages.id, id));

			setFlash({ type: 'success', message: 'Delete Successfull' }, cookies);
		} catch (err) {
			setFlash(
				{ type: 'error', message: 'An Error occured while deleting' + err.message },
				cookies
			);

			console.error('Error' + err.message);
		}
	}
};

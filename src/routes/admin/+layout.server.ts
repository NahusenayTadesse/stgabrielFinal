import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}

	try {
		const currentUser = await db
			.select()
			.from(user)
			.where(eq(user.id, locals.user.id))
			.then((r) => r[0]);

		return {
			currentUser
		};
	} catch (err) {
		/* Re-throw redirects, handle only real errors */
		if (err instanceof Error && err.message.startsWith('Redirect')) {
			throw err;
		}
		// console.error('DB error in layout load:', err);
		// /* You can return a 500 here or let it bubble */
		// throw error(500, 'Unable to load user data');
	}
};

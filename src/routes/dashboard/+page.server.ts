import * as auth from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { bookings, contactMessages } from '$lib/server/db/schema';
import { and, eq, lte, sql } from 'drizzle-orm';
export const load: PageServerLoad = async ({ locals }) => {
	const noOfAppointments = await db
		.select({ count: bookings.id })
		.from(bookings)
		.where(eq(bookings.date, new Date()));

	const todayReport = await db;

	return {
		nofAppointments: noOfAppointments.length
	};
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		redirect('/login', { type: 'success', message: 'Logout Successful' }, event.cookies);
	}
};

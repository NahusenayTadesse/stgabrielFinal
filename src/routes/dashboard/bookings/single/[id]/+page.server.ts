import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { bookingFeeSchema as schema } from '$lib/zodschemas/appointmentSchema';
import { editAppointment } from '$lib/ZodSchema';

import { db } from '$lib/server/db';
import { bookings } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { setError, fail, message } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const form = await superValidate(zod4(schema));
	const editForm = await superValidate(zod4(editAppointment));

	const appointmentsList = await db
		.select({
			extraSettings: bookings.id,
			customerName: bookings.name,
			phone: bookings.phone,
			email: bookings.email,
			status: bookings.status,
			date: sql<string>`DATE_FORMAT(${bookings.date}, '%Y-%m-%d')`,
			time: sql<string>`DATE_FORMAT(${bookings.time}, '%H:%i')`,
			notes: bookings.notes
		})
		.from(bookings)
		.where(eq(bookings.id, id))
		.then((rows) => rows[0]);

	return {
		appointmentsList: appointmentsList ?? [],
		form,
		editForm
	};
};

export const actions: Actions = {
	confirmAppointment: async ({ request, cookies, params }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}

		const { status } = form.data;

		try {
			let { id } = params;

			await db.update(bookings).set({ status }).where(eq(bookings.id, id));

			setFlash({ type: 'success', message: 'Booking Status Changed successfully.' }, cookies);
			return message(form, {
				type: 'success',
				text: 'Booking Status Changed successfully.'
			});
		} catch (err) {
			setFlash({ type: 'error', message: `Unexpected Error: ${err.message}` }, cookies);
			return message(form, {
				type: 'error',
				text: 'Unexpected error occurred.' + err.message
			});
		}
	},

	editAppointment: async ({ request, cookies, params }) => {
		const form = await superValidate(request, zod4(editAppointment));

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}
		const { customerName, date, time, notes } = form.data;

		if (!customerName) {
			setError(form, 'customerName', 'Customer is required.');
			setFlash({ type: 'error', message: 'Customer Name is required.' }, cookies);
			return fail(400, { form });
		}

		const newDate = new Date(date);
		const { id } = params;
		try {
			await db
				.update(bookings)
				.set({
					name: customerName,
					date: newDate,
					time,
					notes
				})
				.where(eq(bookings.id, id));

			// Stay on the same page and set a flash message
			setFlash({ type: 'success', message: 'Booking updated Successfully' }, cookies);
			return message(form, {
				type: 'success',
				text: 'Booking updated Successfully'
			});
		} catch (err) {
			console.error('Error' + err);
			setFlash({ type: 'error', message: 'Error: Something Went Wrong Try Again' }, cookies);

			return message(form, {
				type: 'error',
				text: 'Unexpected error occurred.' + err.message
			});
		}
	},
	delete: async ({ cookies, params }) => {
		const { id } = params;

		try {
			if (!id) {
				setFlash(
					{ type: 'error', message: `There is no appointment with the provided ID.` },
					cookies
				);
				return fail(400);
			}

			await db.delete(bookings).where(eq(bookings.id, id));

			setFlash({ type: 'success', message: 'Booking Deleted Successfully!' }, cookies);
		} catch (err) {
			console.error('Error deleting booking:', err);
			setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
			return fail(400);
		}
	}
};

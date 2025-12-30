// import fs from 'node:fs';
// import path from 'node:path';
// import { generateUserId } from '$lib/global.svelte';
// import { Readable } from 'node:stream';
// import { pipeline } from 'node:stream/promises';
import { env } from '$env/dynamic/private';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { bookingFeeSchema as schema } from '$lib/zodschemas/appointmentSchema';
import { editAppointment } from '$lib/ZodSchema';

// const FILES_DIR: string = env.FILES_DIR ?? '.tempFiles';

// if (!fs.existsSync(FILES_DIR)) {
//   fs.mkdirSync(FILES_DIR, { recursive: true });
// }

import { db } from '$lib/server/db';
import { bookings } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { setError, fail, message } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';
import { saveUploadedFile } from '$lib/server/upload';
import { text } from 'drizzle-orm/sqlite-core';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { id } = params;
	const form = await superValidate(zod4(schema));
	const editForm = await superValidate(zod4(editAppointment));

	const appointmentsList = await db;
	const appointmentsList = await db
		.select({
			extraSettings: bookings.id,
			customerName: bookings.name,
			phone: bookings.phone,
			email: bookings.email,
			status: bookings.status,
			date: sql<string>`DATE_FORMAT(${bookings.date}, '%Y-%m-%d')`,
			time: sql<string>`DATE_FORMAT(${bookings.time}, '%H:%i')`,
			notes: bookings.notes,
			bookedAt: sql<string>`DATE_FORMAT(${appointments.createdAt}, '%Y-%m-%d')`,
			paidAmount: sql<number>`COALESCE(SUM(${transactions.amount}), 0)`
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

	editAppointment: async ({ request, cookies, locals }) => {
		const form = await superValidate(request, zod4(editAppointment));

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}
		const { customerId, appointmentId, appointmentDate, appointmentTime, notes } = form.data;

		if (!customerId) {
			setError(form, 'customerId', 'Customer is required.');
			setFlash({ type: 'error', message: 'Customer Name is required.' }, cookies);
			return fail(400, { form });
		}

		const newDate = new Date(appointmentDate);

		try {
			await db
				.update(appointments)
				.set({
					customerId,
					appointmentDate: newDate,
					appointmentTime,
					notes,
					updatedBy: locals?.user?.id
				})
				.where(eq(appointments.id, appointmentId));

			// Stay on the same page and set a flash message
			setFlash({ type: 'success', message: 'Appointment updated Successfully Added' }, cookies);
			return message(form, {
				type: 'success',
				text: 'Appointment updated Successfully Added'
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

			await db.delete(appointments).where(eq(appointments.id, id));

			setFlash({ type: 'success', message: 'Appointment Deleted Successfully!' }, cookies);
		} catch (err) {
			console.error('Error deleting appointment:', err);
			setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
			return fail(400);
		}
	}
};

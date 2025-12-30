// reservationSchema.ts
import { z } from 'zod/v4';

const today = new Date();
today.setHours(0, 0, 0, 0); // normalise to midnight so we can compare dates only

export const reservationSchema = z.object({
	date: z.string('Date is Required'),

	time: z
		.string()
		.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:mm 24-hour format')
		.refine(
			(t) =>
				[
					'12:00',
					'12:30',
					'13:00',
					'13:30',
					'14:00',
					'14:30',
					'17:00',
					'17:30',
					'18:00',
					'18:30',
					'19:00',
					'19:30',
					'20:00',
					'20:30',
					'21:00',
					'21:30'
				].includes(t),
			'Selected time is not available'
		),

	partySize: z.coerce
		.number()
		.int('Party size must be an a whole number')
		.min(1, 'Party size must be at least 1')
		.max(40, 'Party size cannot exceed 40'),

	name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),

	email: z.string().email('Please enter a valid email address').max(255, 'Email is too long'),

	phone: z
		.string()
		.trim()
		.min(6, 'Phone number is too short')
		.max(25, 'Phone number is too long')
		.regex(/^\+?[0-9\s\-()]+$/, 'Phone number can only contain digits, spaces, +, -, ( or )'),

	specialRequests: z
		.string()
		.max(500, 'Special requests must be 500 characters or fewer')
		.optional()
});

export type ReservationInput = z.infer<typeof reservationSchema>;

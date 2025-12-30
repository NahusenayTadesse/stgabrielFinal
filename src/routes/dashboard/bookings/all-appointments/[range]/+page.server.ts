import { db } from '$lib/server/db';
import { bookings } from '$lib/server/db/schema';
import { eq, asc, and, sql, SQL, Table } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { currentMonthFilter } from '$lib/global.svelte';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { range } = params;

	const [y1, m1, d1, y2, m2, d2] = range.split('-');

	const start = `${y1}-${m1}-${d1}`;
	const end = `${y2}-${m2}-${d2}`;

	//      const currentMonthFilter = (
	//   dateField: Table,
	//   start?: string,
	//   end?: string
	// ) => {
	//   // If start/end are passed, return BETWEEN condition
	//   if (start && end) {
	//     return sql`${dateField} BETWEEN ${start} AND ${end}`;
	//   }

	//   // Otherwise fallback to current-month logic
	//   const currentYear = new Date().getFullYear();
	//   const currentMonth = new Date().getMonth() + 1;

	//   return sql`
	//     EXTRACT(YEAR FROM ${dateField}) = ${currentYear}
	//     AND EXTRACT(MONTH FROM ${dateField}) = ${currentMonth}
	//   `;
	// };

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

		.orderBy(asc(bookings.time));

	return {
		appointmentsList,
		start,
		end
	};
};

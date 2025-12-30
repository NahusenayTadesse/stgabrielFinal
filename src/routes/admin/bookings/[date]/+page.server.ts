

import { db } from "$lib/server/db";
import { bookings } from "$lib/server/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad = async ({ params }) => {


     const { date } = params;

        const appointmentsList = await db.select(
           {
            extraSettings: bookings.id,
            customerName: bookings.name,
            phone: bookings.phone,
            status: bookings.status, 
            date: sql<string>`DATE_FORMAT(${bookings.date}, '%Y-%m-%d')`,
            time: sql<string>`DATE_FORMAT(${bookings.time}, '%H:%i')`,
            notes: bookings.notes,
            bookedAt: sql<string>`DATE_FORMAT(${bookings.createdAt}, '%Y-%m-%d')`,
        }
        ).from(bookings)
        .where(
            
                eq(bookings.date, date)
          
        )
        .orderBy(asc(bookings.time));


        return {
            appointmentsList
        }
}
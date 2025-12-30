
import fs from 'node:fs';
import path from 'node:path';
import { generateUserId } from '$lib/global.svelte';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { env } from '$env/dynamic/private';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { bookingFeeSchema as schema} from '$lib/zodschemas/appointmentSchema';
import { editAppointment } from '$lib/ZodSchema';

const FILES_DIR: string = env.FILES_DIR ?? '.tempFiles';

if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR, { recursive: true });
}

import { db } from "$lib/server/db";
import { bookings, user  } from "$lib/server/db/schema";
import { eq, and, sql } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import {setError, fail } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';



export const load: PageServerLoad = async ({ params, locals }) => {


     const {id} = params;
       const form = await superValidate(zod4(schema));
       const editForm = await superValidate(zod4(editAppointment))

  

        const appointmentsList = await db.select(
          { 
            id: bookings.id,
            customerName: bookings.name,
            phone: bookings.phone,
            date: sql<string>`DATE_FORMAT(${bookings.date}, '%Y-%m-%d')`,
            time: sql<string>`DATE_FORMAT(${bookings.time}, '%H:%i')`,
            status: bookings.status,
            notes: bookings.notes, 
            bookedAt: sql<string>`DATE_FORMAT(${bookings.createdAt}, '%Y-%m-%d')`
          


          }
        )
        .from(bookings)
        .where(
            eq(bookings.id, id)
        )
        .then(rows => rows[0]);


        


        return {
            appointmentsList,
            form,
           
            editForm
        }
}


export const actions: Actions = {
  confirmAppointment: async ({request, cookies, locals}) => {
     const form = await superValidate(request, zod4(schema));
 

     if (!form.valid) {
           // Stay on the same page and set a flash message
           setFlash({ type: 'error', message: "Please check your form data." }, cookies);
           return fail(400, { form });
         }
     
   const {appointmentId, paymentStatus, amount, paymentMethod, image } = form.data;


   try{

     const imageName = `${generateUserId()}${path.extname(image.name)}`;

const file_path: string = path.normalize(
  path.join(FILES_DIR, imageName));    		

    const nodejs_wstream = fs.createWriteStream(file_path);
    const web_rstream = image.stream();
    const nodejs_rstream = Readable.fromWeb(web_rstream);
    await pipeline(nodejs_rstream, nodejs_wstream).catch(() => {
      return fail(500);
    });

        const [transaction] = await db.insert(transactions).values(
              {
              amount,
              paymentMethodId: paymentMethod,
              recieptLink: imageName,
              paymentStatus,
              branchId: locals.user?.branch,
              createdBy: locals.user?.id
            }

        ).$returningId();

         await db.insert(transactionBookingFee).values({
            fee: amount, 
            transactionId: transaction.id,
            appointmentId,
         });

        await db.update(appointments)
        .set({ statusId: 2, updatedBy: locals.user?.id })
        .where(eq(appointments.id, appointmentId));

        delete form.data.image;

       setFlash({ type: 'success', message: "Successfully Confirmed Appointment "  }, cookies);
    return {   
     form    
 }; 
} catch(err){
         
         setFlash({ type: 'error', message: `Unexpected Error: ${err.message}`}, cookies);
                 return fail(400, {
                 form
               });
    }

  },

  editAppointment: async({request, cookies, locals})=> {

       const form = await superValidate(request, zod4(editAppointment));
  
    if (!form.valid) {
      // Stay on the same page and set a flash message
      setFlash({ type: 'error', message: "Please check your form data." }, cookies);
      return fail(400, { form });
    }
    const {customerId, appointmentId, appointmentDate, appointmentTime, notes} = form.data;
     

    if (!customerId) {
      setError(form, 'customerId', 'Customer is required.');
        setFlash({ type: 'error', message: "Customer Name is required." }, cookies);
        return fail(400, { form });
    }
      
    const newDate = new Date(appointmentDate);
    

    try{

       await db.update(appointments).set({
        customerId,
        appointmentDate: newDate,
        appointmentTime,
        notes,
        updatedBy: locals?.user?.id,
      }).where(eq(appointments.id, appointmentId));
 
      // Stay on the same page and set a flash message
      setFlash({ type: 'success', message: "Appointment updated Successfully Added" }, cookies);
      return {
        form
      };
    } catch(err){
      console.error("Error" + err)
      setFlash({ type: 'error', message: "Error: Something Went Wrong Try Again" }, cookies);

      return fail(400, {
        form
      });
    }


  }
}
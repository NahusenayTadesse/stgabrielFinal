import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

import { db } from '$lib/server/db';
import { contactMessages } from '$lib/server/db/schema';
import { fail } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod4(schema));

   

    return {
        form,
       
    };
};

export const actions: Actions = {
 addMessage: async({request, cookies})=>{
         
         		const form = await superValidate(request, zod4(schema));

                if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);

			return fail(400, { form });
		}

         const { name, email, phone, message, subject } = form.data
       try {
         await db.insert(contactMessages).values({
             name,
             email,
             phone,
             subject,

             message
             
            }); 

         			setFlash({ type: 'success', message: 'Message Successuflly Added' }, cookies);

        } catch(err) {
            setFlash(
				{ type: 'error', message: 'An Error occured while adding Message' + err.message },
				cookies
			);

			console.error('Error' + err.message);
		}
    },



};


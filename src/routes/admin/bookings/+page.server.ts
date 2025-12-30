import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async() => {

    const date = new Date();

     redirect(307, `/admin/bookings/${date.toLocaleDateString("en-CA")}`);
}
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const date = new Date();

	return redirect(307, `/dashboard/bookings/${date.toLocaleDateString('en-CA')}`);
};

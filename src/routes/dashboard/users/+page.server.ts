import { db } from '$lib/server/db';
import type { PageServerLoad } from '../$types';
import { user } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ locals }) => {
	const userList = await db
		.select({
			id: user.id,
			name: user.username,
			email: user.email
		})
		.from(user);

	return {
		userList
	};
};

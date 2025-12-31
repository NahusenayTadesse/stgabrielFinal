import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { menu, menuCategory } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const menuList = await db
		.select({
			name: menu.name,
			price: menu.price,
			category: menuCategory.name,
			description: menu.description
		})
		.from(menu)
		.leftJoin(menuCategory, eq(menu.categoryId, menuCategory.id))
		.orderBy(asc(menu.name));

	const category = await db
		.select({
			title: menuCategory.name,
			description: menuCategory.description
		})
		.from(menuCategory);

	return {
		menuList,
		category
	};
};

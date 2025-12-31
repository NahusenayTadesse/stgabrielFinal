import { z } from 'zod/v4';

export const menuSchema = z.object({
	name: z.string().min(2).max(100),
	category: z.coerce.string('Category is required'),
	description: z.string().min(2).max(500).optional(),
	price: z.coerce.string('Price is required').min(0).max(10000)
});

export type Menu = z.infer<typeof menuSchema>;

export const menuUpdateSchema = z.object({
	id: z.coerce.string('ID is required'),
	name: z.string().min(2).max(100).optional(),
	category: z.coerce.string('Category is required').optional(),
	description: z.string().min(2).max(500).optional(),
	price: z.coerce.string('Price is required').min(0).max(10000).optional()
});

export type MenuUpdate = z.infer<typeof menuUpdateSchema>;

export const addCategory = z.object({
	name: z.string().min(2).max(100),
	description: z.string().min(2).max(500).optional()
});

export const deleteMenuItem = z.object({
	id: z.coerce.string('ID is required')
});

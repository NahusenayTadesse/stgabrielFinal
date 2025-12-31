import { z } from 'zod/v4';

export const addCategory = z.object({
	name: z.string().min(2).max(100),
	description: z.string().min(2).max(500).optional()
});

export type AddCategory = z.infer<typeof addCategory>;

export const categoryUpdateSchema = z.object({
	id: z.coerce.string('ID is required'),
	name: z.string().min(2).max(100).optional(),
	description: z.string().min(2).max(500).optional()
});

export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>;

export const deleteMenuItem = z.object({
	id: z.coerce.string('ID is required')
});

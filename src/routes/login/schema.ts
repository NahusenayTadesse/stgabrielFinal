import z from 'zod/v4';

export const schema = z.object({
	email: z.email('Please enter a valid email address'),
	password: z
		.string()
		.nonempty('Password is required')
		.min(8, 'Password must be at least 8 characters long')
});

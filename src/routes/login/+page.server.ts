import { verify } from '@node-rs/argon2';
// import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema.js';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/ZodSchema';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
	const form = await superValidate(zod4(loginSchema));

	return { form };
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event.request, zod4(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const { email, password } = form.data;

			const result = await db
				.select()
				.from(table.user)
				.where(eq(table.user.email, email))
				.then((rows) => rows[0]);

			if (!result) {
				setError(form, 'email', 'Incorrect username or password');
				setError(form, 'password', 'Incorrect username or password');
				return message(form, { type: 'error', text: 'Incorrect username or password' });
			}

			const validPassword = await verify(result.passwordHash, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});
			if (!validPassword) {
				setError(form, 'email', 'Incorrect username or password');
				setError(form, 'password', 'Incorrect username or password');
				return message(form, { type: 'error', text: 'Incorrect username or password' });
			}

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, result.id);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

			redirect('/dashboard', { type: 'success', message: 'Login Successful!' }, event.cookies);
		} catch (error) {
			console.error(error?.message);
			return message(form, { type: 'error', text: 'An error occurred while logging in' });
		}
	}
};

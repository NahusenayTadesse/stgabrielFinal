import { superValidate, message as superMessage } from 'sveltekit-superforms';
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
		form
	};
};

export const actions: Actions = {
	addMessage: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);

			return fail(400, { form });
		}

		const { name, email, phone, message } = form.data;
		try {
			await db.insert(contactMessages).values({
				name,
				email,
				phone,

				message
			});

			await sendBookingEmails(form.data);
		} catch (err) {
			return superMessage(form, {
				type: 'error',
				text: 'Message Sending Failed! Please try again later ' + err?.message
			});
		}

		return superMessage(form, {
			type: 'success',
			text: 'Your message has been sent successfully!'
		});
	}
};

import nodemailer from 'nodemailer';
import { HOST, PORT, USER, PASSWORD } from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: HOST,
	port: PORT,
	secure: PORT === '465' ? true : false, // true for 465, false for others
	auth: {
		user: USER,
		pass: PASSWORD
	}
});

async function sendBookingEmails(data: {
	name: string;
	email: string;
	phone?: string;

	message?: string;
}) {
	const { name, email, phone, message } = data;

	const currentYear = new Date().getFullYear();
	const brandColor = '#291900';
	const domain = 'saintgabrielcafe.com';
	const logoUrl = `https://${domain}/Logo.svg`;

	// Confirmation email to the user
	const userHtml = `
    <div style="font-family: Arial, sans-serif; color: ${brandColor}; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px; padding-top: 45px;">
        <img src="${logoUrl}" alt="Saint Gabriel Cafe Logo" style="width:150px;height:auto;" />
      </div>
      <h2 style="color: ${brandColor};">Thank You — Saint Gabriel Cafe</h2>
      <p>Hi ${name?.split(' ')[0] || name},</p>
      <p>Thank you for reaching out to us! We've received your message and our team will review it shortly.</p>
      <p>If we need any further information, we'll get in touch with you using the contact details you provided.</p>
      <br>
      <p>Warm regards,<br/><strong style="color:${brandColor};">Saint Gabriel Cafe Team</strong></p>
      <p style="text-align:center;">&copy; ${currentYear} <a href="https://${domain}" style="color:${brandColor};text-decoration:none;">${domain}</a> — All Rights Reserved.</p>
    </div>
  `;

	// Notification email to admin
	const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: ${brandColor}; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px; padding-top: 45px;">
        <img src="${logoUrl}" alt="Saint Gabriel Cafe Logo" style="width:150px;height:auto;" />
      </div>
      <h2 style="color: ${brandColor};">New Message Received — Saint Gabriel Cafe</h2>
      <p><strong>Full Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <br>
      <p style="text-align:center;">&copy; ${currentYear} <a href="https://${domain}" style="color:${brandColor};text-decoration:none;">${domain}</a></p>
    </div>
  `;

	// Send confirmation to guest
	await transporter.sendMail({
		from: `"Saint Gabriel Cafe" <${USER}>`,
		to: email,
		subject: 'Thank You for Your Message — Saint Gabriel Cafe',
		html: userHtml
	});

	// Send notification to admin
	await transporter.sendMail({
		from: `"Saint Gabriel Cafe Booking" <${USER}>`,
		to: USER,
		subject: 'New Message Received — Saint Gabriel Cafe',
		html: adminHtml
	});
}

import { fail, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { reservationSchema as schema } from './schema';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { bookings } from '$lib/server/db/schema';

// Define outside the load function so the adapter can be cached

export const load = async () => {
  const form = await superValidate(zod4(schema));

  // Always return { form } in load functions
  return { form };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => { 

   const form = await superValidate(request, zod4(schema));
    console.log(form);


     if (!form.valid) {
      setFlash({ type: 'error', message: "Please check your form." }, cookies);
      return fail(400, { form });
    }  

       const {  date, time, partySize, name, email, phone, specialRequests  } = form.data; 


      try { 
        await db.insert(bookings).values({
          date, time, partySize, name, email, phone, notes: specialRequests
        }); 

        await sendBookingEmails(form.data);
      } catch (err) {
        console.error('Failed to insert booking:', err);
        setFlash({ type: 'error', message: 'Unable to create booking. Please try again later.' }, cookies);
        return fail(500, { form });
      }

       setFlash({ type: 'success', message: "Booking succeful!" }, cookies);


  }  
  
  
  

}

import nodemailer from 'nodemailer';
import { HOST, PORT, USER, PASSWORD } from '$env/static/private';

const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === "465" ? true : false, // true for 465, false for others
    auth: {
        user: USER,
        pass: PASSWORD
    }
});

async function sendBookingEmails(data: {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests?: string;
}) {
  const { name, email, phone, date, time, partySize, specialRequests } = data;

  const currentYear = new Date().getFullYear();
  const brandColor = '#291900';
  const domain = 'saintgabrielcafe.co.uk';
  const logoUrl = `https://${domain}/logo.png`;

  // Confirmation email to the guest
  const userHtml = `
    <div style="font-family: Arial, sans-serif; color: ${brandColor}; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px; padding-top: 45px;">
        <img src="${logoUrl}" alt="Saint Gabriel Cafe Logo" style="width:150px;height:auto;" />
      </div>
      <h2 style="color: ${brandColor};">Booking Confirmation — Saint Gabriel Cafe</h2>
      <p>Hi ${name.split(' ')[0] || name},</p>
      <p>Thank you — we've received your booking request. Here are the details we have:</p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Party size:</strong> ${partySize}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
      </ul>
      ${specialRequests ? `<p><strong>Special requests:</strong> ${specialRequests}</p>` : ''}
      <p>We'll contact you if we need any further information. If you need to change or cancel your booking, please reply to this email or visit <a href="https://${domain}" style="color:${brandColor};text-decoration:none;">${domain}</a>.</p>
      <br>
      <p>Warm regards,<br/><strong style="color:${brandColor};">Saint Gabriel Cafe Team</strong></p>
      <p style="text-align:center;">&copy; ${currentYear} <a href="https://${domain}" style="color:${brandColor};text-decoration:none;">Saint Gabriel Cafe</a> — All Rights Reserved.</p>
    </div>
  `;

  // Notification email to admin
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: ${brandColor}; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px; padding-top: 45px;">
        <img src="${logoUrl}" alt="Saint Gabriel Cafe Logo" style="width:150px;height:auto;" />
      </div>
      <h2 style="color: ${brandColor};">New Booking Received — Saint Gabriel Cafe</h2>
      <p><strong>Full Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Party size:</strong> ${partySize}</p>
      ${specialRequests ? `<p><strong>Special requests:</strong> ${specialRequests}</p>` : ''}
      <br>
      <p style="text-align:center;">&copy; ${currentYear} <a href="https://${domain}" style="color:${brandColor};text-decoration:none;">Saint Gabriel Cafe</a></p>
    </div>
  `;

  // Send confirmation to guest
  await transporter.sendMail({
    from: `"Saint Gabriel Cafe" <${USER}>`,
    to: email,
    subject: "Booking Confirmation — Saint Gabriel Cafe",
    html: userHtml
  });

  // Send notification to admin
  await transporter.sendMail({
    from: `"Saint Gabriel Cafe Booking" <${USER}>`,
    to: USER,
    subject: "New Booking Received — Saint Gabriel Cafe",
    html: adminHtml
  });
}
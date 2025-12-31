import nodemailer from 'nodemailer';

import { HOST, USER, PASSWORD, PORT } from '$env/static/private';

export async function sendResetPasswordEmail(toEmail: string, newPassword: string) {
	// Create transporter
	const transporter = nodemailer.createTransport({
		host: HOST, // e.g smtp.gmail.com
		port: PORT, // e.g 465 or 587
		secure: true, // true for 465, false for 587
		auth: {
			user: USER, // sender email
			pass: PASSWORD // sender email password / app password
		},
		authMethod: 'PLAIN'
	});
	const mailOptions = {
		from: `"Support Team" <${USER}>`,
		to: toEmail,
		subject: 'Password Reset',
		text: `Your password has been reset. Your new password is: ${newPassword}`,
		html: `
    <h3>Password Reset</h3>
    <p>Your password has been reset successfully.</p>
    <p><strong>New Password:</strong> ${newPassword}</p>
    <p>Please log in and change it immediately for security reasons.</p>
  `,
		envelope: {
			from: 'admin@sunamarketing.com', // <-- important
			to: toEmail
		}
	};

	await transporter.sendMail(mailOptions);

	return { success: true, message: 'Reset email sent successfully' };
}

// export async function sendBookingEmail({
// 	date,
// 	time,
// 	partySize,
// 	name,
// 	email,
// 	phone,
// 	specialRequests
// }) {
// 	const html = `
//   <!DOCTYPE html>
//   <html>
//     <body style="margin:0; padding:0; background:#f7f7f7;">
//       <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f7f7; padding:20px 0;">
//         <tr>
//           <td align="center">
//             <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:6px; overflow:hidden;">

//               <tr>
//                 <td align="center" style="background:#291900; padding:25px;">
//                   <img src="https://stgabrielcafe.com/Logo.svg" alt="St Gabriel Cafe" style="max-width:180px; display:block;" />
//                 </td>
//               </tr>

//               <tr>
//                 <td style="padding:25px 30px; font-family:Arial, Helvetica, sans-serif; color:#291900;">
//                   <h2 style="margin:0 0 10px 0; font-size:24px; font-weight:bold;">
//                     New Reservation
//                   </h2>
//                   <p style="margin:0; font-size:15px; line-height:22px;">
//                     A new booking has been made.
//                   </p>
//                 </td>
//               </tr>

//               <tr>
//                 <td style="padding:0 30px 20px 30px;">
//                   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff7ec; border:1px solid #6b4000;">
//                     <tr>
//                       <td style="padding:15px 20px; font-family:Arial, Helvetica, sans-serif; color:#291900; font-size:14px;">
//                         <strong>Date:</strong> ${date}<br/>
//                         <strong>Time:</strong> ${time}<br/>
//                         <strong>Party Size:</strong> ${partySize}<br/>
//                         <strong>Name:</strong> ${name}<br/>
//                         <strong>Email:</strong> ${email}<br/>
//                         <strong>Phone:</strong> ${phone}<br/>
//                         <strong>Special Requests:</strong> ${specialRequests || 'None'}
//                       </td>
//                     </tr>
//                   </table>
//                 </td>
//               </tr>

//               <tr>
//                 <td align="center" style="background:#291900; color:#ffffff; font-family:Arial, Helvetica, sans-serif; padding:18px 20px; font-size:12px;">
//                   St Gabriel Cafe<br/>
//                   Reservation Notification
//                 </td>
//               </tr>

//             </table>
//           </td>
//         </tr>
//       </table>
//     </body>
//   </html>
//   `;

// 	return transporter.sendMail({
// 		from: `"St Gabriel Cafe" <${USER}>`,
// 		to: ADMIN_EMAIL,
// 		subject: 'New Booking Reservation',
// 		html
// 	});
// }

// export async function sendCustomerConfirmationEmail({
// 	date,
// 	time,
// 	partySize,
// 	name,
// 	email,
// 	phone,
// 	specialRequests
// }) {
// 	const html = `
//   <!DOCTYPE html>
//   <html>
//     <body style="margin:0; padding:0; background:#f7f7f7;">
//       <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f7f7; padding:20px 0;">
//         <tr>
//           <td align="center">
//             <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:6px; overflow:hidden;">

//               <tr>
//                 <td align="center" style="background:#291900; padding:25px;">
//                   <img src="https://stgabrielcafe.com/Logo.svg" alt="St Gabriel Cafe" style="max-width:180px; display:block;" />
//                 </td>
//               </tr>

//               <tr>
//                 <td style="padding:25px 30px; font-family:Arial, Helvetica, sans-serif; color:#291900;">
//                   <h2 style="margin:0 0 10px 0; font-size:24px; font-weight:bold;">
//                     Your Reservation is Confirmed
//                   </h2>
//                   <p style="margin:0; font-size:15px; line-height:22px;">
//                     Hi <strong>${name}</strong>, thank you for booking with <strong>St Gabriel Cafe</strong>!
//                     We look forward to welcoming you.
//                   </p>
//                 </td>
//               </tr>

//               <tr>
//                 <td style="padding:0 30px 20px 30px;">
//                   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff7ec; border:1px solid #6b4000;">
//                     <tr>
//                       <td style="padding:15px 20px; font-family:Arial, Helvetica, sans-serif; color:#291900; font-size:14px;">
//                         <strong>Date:</strong> ${date}<br/>
//                         <strong>Time:</strong> ${time}<br/>
//                         <strong>Party Size:</strong> ${partySize}<br/>
//                         <strong>Name:</strong> ${name}<br/>
//                         <strong>Email:</strong> ${email}<br/>
//                         <strong>Phone:</strong> ${phone}<br/>
//                         <strong>Special Requests:</strong> ${specialRequests || 'None'}
//                       </td>
//                     </tr>
//                   </table>
//                 </td>
//               </tr>

//               <tr>
//                 <td style="padding:0 30px 25px 30px; font-family:Arial, Helvetica, sans-serif; color:#291900; font-size:14px; line-height:22px;">
//                   If you need to make changes, simply reply to this email.
//                   We can’t wait to see you!
//                 </td>
//               </tr>

//               <tr>
//                 <td align="center" style="background:#291900; color:#ffffff; font-family:Arial, Helvetica, sans-serif; padding:18px 20px; font-size:12px;">
//                   St Gabriel Cafe<br/>
//                   Thank you for choosing us.
//                 </td>
//               </tr>

//             </table>
//           </td>
//         </tr>
//       </table>
//     </body>
//   </html>
//   `;

// 	return transporter.sendMail({
// 		from: `"St Gabriel Cafe" <${USER}>`,
// 		to: email,
// 		subject: 'Your Reservation is Confirmed – St Gabriel Cafe',
// 		html
// 	});
// }

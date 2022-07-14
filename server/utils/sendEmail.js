const nodeMailer = require("nodemailer");
require('dotenv').config({path:"server/config/config.env"});
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.NODE_MAIL);

// const sendEmail = async (options) => {
//   const transporter = nodeMailer.createTransport({
//     host: process.env.SMPT_HOST,
//     port: process.env.SMPT_PORT,
//     service: process.env.SMPT_SERVICE,
//     auth: {
//       user: process.env.SMPT_MAIL,
//       pass: process.env.SMPT_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMPT_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

const sendEmail = (to, subject, text) => {
	const msg = {
		to,
		from: 'freekillsonoob@gmail.com',
		subject,
		text,
	};
	sgMail.send(msg, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
};

module.exports = sendEmail;

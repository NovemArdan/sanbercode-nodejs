import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

// USING MAILTRAP
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '795a8ed260f8e9', // Replace with your Mailtrap username
    pass: '2b9d7a7e1d4401', // Replace with your Mailtrap password
  },
});

// USING GMAIL
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-gmail-password'
//   }
// });

export const sendInvoiceEmail = async (
  order: any,
  customerEmail: string,
  customerName: string,
  contactEmail: string,
  companyName: string
) => {
  const templatePath = path.resolve(__dirname, '../views/invoice.ejs');
  const templateData = {
    customerName,
    orderItems: order.orderItems,
    grandTotal: order.grandTotal,
    contactEmail,
    companyName,
    year: new Date().getFullYear(),
  };

  const htmlContent = await ejs.renderFile(templatePath, templateData);

  const mailOptions = {
    from: 'irontmp+7kx58@gmail.com',
    to: customerEmail,
    subject: `Your Invoice from ${companyName}`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

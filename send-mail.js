const nodemailer = require('nodemailer')

const main = async () => {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: 'Site Down',
    text: 'There are sites down!',
    html: '<b>There are sites down!</b>'
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

module.exports = main

const nodemailer = require('nodemailer')
const { SMTP, MAIL } = require('./config')
const logger = require('./logger')

async function sendMail (subject, html, config) {
  const transporter = nodemailer.createTransport({
    host: SMTP.HOST,
    port: SMTP.PORT,
    secure: false,
    auth: {
      user: SMTP.USERNAME,
      pass: SMTP.PASSWORD
    }
  })
  const info = await transporter.sendMail({
    from: MAIL.FROM,
    to: MAIL.TO,
    subject: subject,
    html: html
  })

  logger.info(`Message sent: ${info.messageId}`)
}

module.exports = sendMail

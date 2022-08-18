import mailer from 'nodemailer'
import mailerconfig from './mail.config..js'

export default mailer.createTransport(mailerconfig)
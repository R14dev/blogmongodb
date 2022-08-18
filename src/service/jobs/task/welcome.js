import mail from "../../mail/mail.js";

export default {
    key:'welcome',
   async handler(data){
       const user = data.data
       await mail.sendMail({
        from: `${process.env.SINAME} <${process.env.NOREPLY}>`,
        to: `${user.name} <${user.email}>`,
        subject: `${process.env.SINAME} Welcome `,
        html: `<h1>hello ${user.name}</>,<p>please verify you account <a style='text-decoration:none;color:#fff;background:green;display:block;min-height:30px;line-height:30px;width:150px;border-radius:3px;font-size:12px;text-align:center;text-align:center;' href='${process.env.DOMAIN}/verify/${user.token}'>Verify Account</a>`
       })
   }
}
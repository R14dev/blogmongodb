import mail from "../../mail/mail.js";

export default {
    key:'Alert',
   async handler(data){
       const user = data.data
       await mail.sendMail({
        from: `${process.env.SINAME} <${process.env.NOREPLY}>`,
        to: `${user.name} <${user.email}>`,
        subject: `${process.env.SINAME} Alert `,
        html: `<h1>hello ${user.name}</>,<p>Alguem accessou sua conta !</p>`
       })
   }
}

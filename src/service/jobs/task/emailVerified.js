import mail from "../../mail/mail.js";

export default {
    key:'emailVerified',
   async handler(data){
       const user = data.data
       await mail.sendMail({
        from: `${process.env.SINAME} <${process.env.NOREPLY}>`,
        to: `${user.name} <${user.email}>`,
        subject: `${process.env.SINAME} Obrigado `,
        html: `<h1>Ola ${user.name}</>,<p> obrigado por verificarsua conta!</p>`
       })
   }
}





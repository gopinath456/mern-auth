import nodemaier from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
const transporter=nodemaier.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})

console.log(process.env.DATA_BASE);
export {transporter};


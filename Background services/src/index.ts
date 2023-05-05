import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import WelcomeEmail from './EmailService/WelcomeEmail';
import AdmissionReportEmail from './EmailService/AdmissionReport';
import AppointmentEmail from './EmailService/AppointmentEmail';
import DiagnosisEmail from './EmailService/diagnosisEmail';


const app = express()

dotenv.config()

const run = () => {
    cron.schedule('* * * * *', () => {

        WelcomeEmail()
        AdmissionReportEmail()
        AppointmentEmail()
        DiagnosisEmail()

    });

}

run()
const PORT = process.env.PORT


app.listen(PORT, () => {

    console.log(`Background services is running on port ${PORT}`)
})
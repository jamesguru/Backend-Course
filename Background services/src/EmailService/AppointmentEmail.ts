import ejs from 'ejs';
import mssql from 'mssql'
import dotenv from 'dotenv';
import Connection from '../Helpers/database';
import { sqlconfig } from '../Config/config';
import sendMail from '../Helpers/sendMail';

dotenv.config()
const db = new Connection()

interface Appointment {
    id: number,
    patient_name: string,
    doctor_email: string,
    date: string,

    patient_email: string,

    issent: number
}

const AppointmentEmail = async () => {

    const appointments: Appointment[] = (await db.exec('checkAppointment')).recordset;

    for (let appointment of appointments) {

        ejs.renderFile('templates/Appointment.ejs', { name: appointment.patient_email, date: appointment.date }, async (err, data) => {
            let messageoption = {
                from: process.env.EMAIL,
                to: appointment.doctor_email,
                subject: "You have an appointment",
                html: data,

                attachments: [
                    {
                        filename: "sendIt.txt",
                        content: "appointment",
                    },
                ],
            };

            try {

                await sendMail(messageoption);

                await db.exec('updateAppointment');

            } catch (error) {

                console.log(error)

            }



        })
    }

}

export default AppointmentEmail;
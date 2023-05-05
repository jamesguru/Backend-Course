import ejs from 'ejs';
import mssql from 'mssql'
import dotenv from 'dotenv';
import Connection from '../Helpers/database';
import { sqlconfig } from '../Config/config';
import sendMail from '../Helpers/sendMail';

dotenv.config()
const db = new Connection()

interface Diagnosis {
    id: number,
    name_treatment: string,
    drug_administered: string,
    doctor_name: string,
    patient_email: string,
    bill: number,
    date: string,
    paid: string,
    description: string,
    patient_status: string,
    issent: string
}

const DiagnosisEmail = async () => {

    const diagnosis: Diagnosis[] = (await db.exec('checkDiagnosis')).recordset;

    for (let diagnose of diagnosis) {

        ejs.renderFile('templates/diagnosis.ejs', async (err, data) => {

            let messageoption = {

                from: process.env.EMAIL,
                to: diagnose.patient_email,
                subject: `Hello here is the treatment that patient has been ${diagnose.name_treatment}`,

                html: data,

                attachments: [

                    {

                        filename: "diagnosis.txt",
                        content: `${diagnose.description}`
                    }


                ]
            }


            try {

                await sendMail(messageoption);
                await db.exec('updateDiagnosisSendEmail');

            } catch (error) {
                console.log(error)
            }


        })


    }


}

export default DiagnosisEmail;
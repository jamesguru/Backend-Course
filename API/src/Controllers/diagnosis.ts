import { Request, RequestHandler, Response } from 'express';
import Connection from '../Helpers/database';

const db = new Connection();


export const createDiagnosis = async (req: Request, res: Response) => {


    const { name_treatment, drug_administered, doctor_name, patient_email, bill, date, paid, description, patient_status } = req.body;

    try {

        await db.exec('addDiagnosis', { name_treatment, drug_administered, doctor_name, patient_email, bill, date, paid, description, patient_status })

        res.status(201).json({ message: "diaganosis has been created successfully" })

    } catch (error) {

        res.status(400).json({ error: 'Something went wrong' })
    }



}

export const updateDiagnosis: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {

    const id = req.params.id;

    try {

        await db.exec('updateDiagnosis', { id })

        res.status(201).json({ message: "Diagnosis updated successfully" })

    } catch (error) {


        res.status(400).json({ error: 'Something went wrong' })

    }

}

export const getDiagnosisForUser = async (req: Request, res: Response) => {

    const { email } = req.body;

    try {

        const diaganosis = (await db.exec('getDiagnosisForUser', { email })).recordset;

        res.status(200).json(diaganosis);

    } catch (error) {

        res.status(400).json({ error: 'Something went wrong' })
    }

}
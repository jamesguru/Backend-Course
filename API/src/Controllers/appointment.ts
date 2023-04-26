import {Response,Request} from "express"
import Connection from "../Helpers/database"
const db = new Connection();

export const CreateAppointment = async(req:Request,res:Response) =>{

    const {patient_name,doctor_email,date,patient_email} = req.body;

    try {

        await db.exec('addAppointment',{patient_name,doctor_email,date,patient_email});

        res.status(201).json({message:"appointment has been created successfully"})
        
    } catch (error) {
        
      res.status(500).json({error:'something went wrong'})
    }

    
}
import { Request, RequestHandler, Response } from "express";
import { loginSchema, registerSchema } from "../Helpers/userValidation";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Connection from "../Helpers/database";
import dotenv from 'dotenv';

dotenv.config()


const db = new Connection();

export const signUp = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body;

    try {

        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            res.status(500).json(error.details[0].message);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.exec('signUp', { name, email, role, password: hashedPassword });

        res.status(201).json({ message: 'sucessfully created user' })
    } catch (error) {
        res.status(500).json({ message: "server is unable to handle request" });
    }


}

export const signIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            res.status(500).json(error.details[0].message);
        }

        const user = await db.exec('signin', { email, password });

        const userData = user?.recordset[0] as {
            id: number,
            name: string,
            email: string,
            password: string,
            role: string
        };

        bcrypt.compare(password, userData.password, (err, data) => {

            if (data) {

                const { role, name, id, email, ...other } = userData;

                const user = { role, name, id, email };

                const token = jwt.sign(user, process.env.KEY as string, {
                    expiresIn: "30days"
                });

                res.status(200).json({ user, token })
            } else {

                res.status(500).json({ message: "wrong password" })
            }

        })

        if (error) {

            res.status(500).json(error.details[0].message);
        }


    } catch (error) {

        res.status(400).json({ error: error })

    }



}
export const getUsers = async (req: Request, res: Response) => {

    try {

        const users = (await db.exec('getAllusers')).recordset;
        res.status(200).json(users)



    } catch (error) {

        res.status(400).json({ error: "something went wrong" });

    }

}

export const deleteUser: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {

    const id = req.params.id;
    try {

        await db.exec('deleteUsers', { id });

        res.status(201).json({ message: "user is deleted successfully" })

    } catch (error) {

        res.status(400).json({ error: "Something went wrong" });

    }
}
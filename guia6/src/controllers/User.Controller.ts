import { Request, Response } from "express";
import User from "../models/Users";
import { hashPassword } from "../utils/auth";
import  { validationResult } from "express-validator";
import { body } from "express-validator";
import { validatePassword } from "../utils/auth";
export const login = async (req: Request, res: Response) => {
    // Validar los errores en la solicitud
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Extraer email y password del cuerpo de la solicitud
    const { email, password } = req.body

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('Invalid credentials')
        return res.status(401).json({ error: error.message })
    }
    // Comprobar si el password es correcto (OJO: Importar validatePassword de utils/auth)
    const isPasswordCorrect = await validatePassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Invalid credentials')
        return res.status(401).json({ error: error.message })
    }
    // Si todo es correcto, enviar respuesta de autenticación exitosa
    res.status(200).send('Authenticated')
}
export const createAccount = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const { name, password, email, username } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(409).json({ message: "User already exists for this email" });
        return;
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
        res.status(409).json({ message: "Username already exists" });
        return;
    }
    
    const user = new User(req.body);
    user.password = await hashPassword(password);
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
};
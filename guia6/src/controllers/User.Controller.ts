import { Request, Response } from "express";
import User from "../models/Users";
import { hashPassword } from "../utils/auth";
import  { validationResult } from "express-validator";
import { body } from "express-validator";

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
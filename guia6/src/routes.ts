import { Router, Request, Response } from "express";
import User from "./models/Users";
import { createAccount } from "./controllers/User.Controller";
const router = Router();
import { body } from "express-validator";

router.get('/', (req: Request, res: Response) => {
    res.status(200).send("Bienvenido a la API");
});
router.post('/auth/register', [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("password").isString().isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("username").isString().notEmpty().withMessage("Username is required")], 
    async (req, res) => {
        createAccount(req, res);
});

export default router;
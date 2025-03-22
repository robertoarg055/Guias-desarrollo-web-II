import argon2 from "argon2";

// Genera un hash seguro para una contraseña en texto plano.
export async function hashPassword(plainPassword: string): Promise<string> {
    return await argon2.hash(plainPassword);
}

// Valida si una contraseña en texto plano coincide con su versión encriptada.
export async function validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, plainPassword);
}
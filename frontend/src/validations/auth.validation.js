import { z } from "zod";

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

export const loginSchema = z.object({
    email: z.string()
        .trim()
        .min(1, "El correo electrónico es requerido.")
        .email("Ingresa un formato de correo electrónico válido."),
    password: z.string().min(1, "La contraseña es requerida.")
});

export const registerSchema = z.object({
    first_name: z.string()
        .trim()
        .min(2, "El nombre debe contener al menos 2 caracteres.")
        .regex(nameRegex, "El nombre solo puede contener letras y espacios."),
    last_name: z.string()
        .trim()
        .min(2, "El apellido debe contener al menos 2 caracteres.")
        .regex(nameRegex, "El apellido solo puede contener letras y espacios."),
    email: z.string()
        .trim()
        .min(1, "El correo electrónico es requerido.")
        .email("Ingresa un formato de correo electrónico válido."),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .refine((val) => /[A-Z]/.test(val), {
            message: "Debe contener al menos una letra mayúscula."
        })
        .refine((val) => /[a-z]/.test(val), {
            message: "Debe contener al menos una letra minúscula."
        })
        .refine((val) => /\d/.test(val), {
            message: "Debe contener al menos un número."
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
            message: "Debe contener al menos un carácter especial (ej: ., @, #, $, !)."
        })
});

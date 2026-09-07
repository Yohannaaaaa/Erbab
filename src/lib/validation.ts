import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "İsim en az 2 karakter olmalı").max(80),
  email: z.string().trim().toLowerCase().email("Geçerli bir e-posta girin"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı").max(72),
  role: z.enum(["ERBAB", "GOZLEMCI", "ISVEREN"]),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Geçerli bir e-posta girin"),
  password: z.string().min(1, "Şifre gerekli"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Geçerli bir e-posta girin"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı").max(72),
});

export const profileSchema = z.object({
  title: z.string().trim().max(120).optional().or(z.literal("")),
  bio: z.string().trim().max(2000).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  category: z.string().trim().max(80).optional().or(z.literal("")),
  skills: z.string().trim().max(300).optional().or(z.literal("")),
  yearsExperience: z.coerce.number().int().min(0).max(80).optional(),
  avatarUrl: z
    .string()
    .trim()
    .max(2_000_000, "Görsel çok büyük")
    .refine((val) => !val || val.startsWith("data:image/") || /^https?:\/\//.test(val), "Geçersiz görsel")
    .optional()
    .or(z.literal("")),
});

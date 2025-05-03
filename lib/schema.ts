import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    userName: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    firstName: z.string().min(3, "First name is required"),
    lastName: z.string().min(3, "Last name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const updateMetadataSchema = z.object({
  id: z.string(),
});

export type UpdateMetadataSchema = z.infer<typeof updateMetadataSchema>;

export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  voice: z.string(),
  language: z.string(),
});

export type FileUploadSchema = z.infer<typeof fileUploadSchema>;

import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().optional(),
  acceptTerms: z.boolean().optional(),
}).refine((data) => {
  if (data.confirmPassword !== undefined && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type AuthFormData = z.infer<typeof authSchema>;

export interface AuthResponse {
  mensagem: string;
  success?: boolean;
}

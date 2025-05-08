import { z } from "zod";

const LoginValidator = z.object({
  email: z
    .string({ required_error: "الرجاء إدخال البريد الإلكتروني" })
    .email({ message: "البريد الإلكتروني المدخل غير صحيح" }),
  password: z
    .string({ required_error: "الرجاء إدخال كلمة المرور" })
    .min(1, { message: "الرجاء إدخال كلمة المرور" }),
});

type LoginCredentials = z.infer<typeof LoginValidator>;

export { LoginCredentials, LoginValidator };

import { z } from "zod";
import validator from "validator";

const SignUpValidator = z
  .object({
    name: z
      .string({ required_error: "الرجاء إدخال الاسم" })
      .min(3, { message: "الاسم يجب ان يتكون من 3 احرف على الأقل" })
      .regex(/^[\u0600-\u06FF\s]+$/, {
        message: "يجب ان يكون الاسم باللغة العربية",
      }),
    email: z
      .string({ required_error: "الرجاء إدخال البريد الالكتروني" })
      .email({ message: "البريد الالكتروني المدخل غير صحيح" }),
    password: z
      .string({ required_error: "الرجاء إدخال كلمة المرور" })
      .min(6, { message: "يجب أن يتكون طول كلمة المرور على الأقل من 6 أحرف" }),
    confirmPassword: z
      .string({
        required_error: "الرجاء إعادة كتابة كلمة المرور",
      })
      .min(1, { message: "الرجاء إعادة كتابة كلمة المرور" }),
    national_id: z
      .string()
      .min(10, {
        message: "رقم الهوية الوطنية يجب ان يتكون من 10 خانات",
      })
      .optional(),
    mobile: z
      .string({ required_error: "الرجاء إدخال رقم الهاتف" })
      .refine((value) => validator.isMobilePhone(value, "ar-SA"), {
        message: "الرجاء إدخال رقم هاتف صحيح",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    // Check if both confirmPassword and password are provided
    if (
      confirmPassword.length > 0 &&
      password.length > 0 &&
      confirmPassword !== password
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "كلمة المرور غير متطابقة",
      });
    }
  });

type SignUpCredentials = z.infer<typeof SignUpValidator>;

export { SignUpCredentials, SignUpValidator };

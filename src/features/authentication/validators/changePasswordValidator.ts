import { z } from "zod";

const changePasswordValidator = z
  .object({
    password: z
      .string({ required_error: "الرجاء إدخال كلمة المرور" })
      .min(6, { message: "يجب أن يتكون طول كلمة المرور على الأقل من 6 أحرف" }),
    confirmPassword: z
      .string({
        required_error: "الرجاء إعادة كتابة كلمة المرور",
      })
      .min(1, { message: "الرجاء إعادة كتابة كلمة المرور" }),
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

type changePasswordCredentials = z.infer<typeof changePasswordValidator>;

export { changePasswordCredentials, changePasswordValidator };

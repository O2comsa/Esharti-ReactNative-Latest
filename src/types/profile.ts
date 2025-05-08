import { z } from "zod";

const profileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  status: z.string(),
  google_id: z.string().nullable(),
  device_token: z.string().nullable(),
  email_verified_at: z.string().nullable(),
  national_id: z.string().nullable(),
  profile_picture: z.string(),
});
export type profileProps = z.infer<typeof profileSchema>;

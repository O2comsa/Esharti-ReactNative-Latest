import { z } from "zod";

const courseSchema = z.object({
  title: z.string(),
  price: z.number(),
  duration: z.string(),
  id: z.number(),
  free: z.boolean(),
  image: z.string(),
  description: z.string(),
  lessons_count: z.number(),
  subscribed: z.boolean(),
  eligible: z.boolean(),
  completed: z.boolean(),
  bookmarked: z.boolean(),
});
export type courseProps = z.infer<typeof courseSchema>;

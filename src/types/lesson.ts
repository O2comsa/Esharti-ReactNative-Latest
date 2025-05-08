import { z } from "zod";

const lessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  video: z.string().optional(),
  lesson_time: z.string().optional(),
  course_id: z.string(),
  image: z.string(),
  viewed: z.boolean(),
  bookmarked: z.boolean(),
  completed: z.boolean(),
});

export type lessonProps = z.infer<typeof lessonSchema>;

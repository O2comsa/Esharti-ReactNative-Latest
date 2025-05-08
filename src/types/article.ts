import { z } from "zod";

const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  bookmarked: z.boolean(),
});

export type articleProps = z.infer<typeof articleSchema>;

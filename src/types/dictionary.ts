import { z } from "zod";

const dictionarySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  file_pdf: z.string().optional(),
  price: z.number().optional(),
  pages: z.number().optional(),
  image: z.string().optional(),
  is_paid: z.number().optional(),
  bookmarked: z.boolean(),
  purchased: z.boolean(),
});

export type dictionaryProps = z.infer<typeof dictionarySchema>;

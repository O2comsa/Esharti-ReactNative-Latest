import { z } from "zod";

const planSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  credit: z.number(),
  period: z.number(),
  price: z.number(),
  status: z.string(),
});

export type planProps = z.infer<typeof planSchema>;

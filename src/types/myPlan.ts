import { z } from "zod";

const planSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  credit: z.number(),
  period: z.number(),
  price: z.number(),
  status: z.string(),
  purchased: z.boolean(),
});

export type myPlanProps = z.infer<typeof planSchema>;

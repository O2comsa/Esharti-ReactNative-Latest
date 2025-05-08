import { z } from "zod";

const singleSettingsKeySchema = z.object({
  key: z.string(),
  value: z.string(),
});
export type singleSettingsKeyProps = z.infer<typeof singleSettingsKeySchema>;

import { z } from "zod";

export const SchemaNewCategory = z.object({
  title: z.string(),
  description: z.string().default(""),
  color: z.string()
})

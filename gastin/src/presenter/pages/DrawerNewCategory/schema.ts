import { z } from "zod";

export const SchemaNewCategory = z.object({
  title: z.string().min(3),
  description: z.string(),
  color: z.string()
})

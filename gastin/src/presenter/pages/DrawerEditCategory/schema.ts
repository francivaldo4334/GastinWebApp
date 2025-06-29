import { z } from "zod";

export const SchemaEditCategory = z.object({
  title: z.string(),
  description: z.string().default(""),
  color: z.string()
})

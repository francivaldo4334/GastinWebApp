import { z } from "zod";

export const SchemaNewCategory = z.object({
  title: z.string()
})

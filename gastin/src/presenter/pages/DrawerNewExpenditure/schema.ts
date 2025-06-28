import { z } from "zod";

export const SchemaNewExpenditure = z.object({
  value: z.string(),
  description: z.string().default(""),
  category: z.string(),
  isRecurrent: z.boolean(),
  isEveryDays: z.boolean(),
  initValidity: z.string().date().optional(),
  endValidity: z.string().date().optional()
}).superRefine((attrs, ctx) => {
  if (
    attrs.isRecurrent &&
    !attrs.isEveryDays
  ) {
    if (!attrs.initValidity) {
      ctx.addIssue({
        code: "invalid_type",
        path: ["initValidity"],
        expected: "date",
        received: "undefined"
      })
    }
    if (!attrs.endValidity) {
      ctx.addIssue({
        code: "invalid_type",
        path: ["endValidity"],
        expected: "date",
        received: "undefined"
      })
    }
    return
  }
  return z.NEVER
})

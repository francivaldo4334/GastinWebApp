import { z } from "zod";

export const SchemaNewReceipt = z.object({
  value: z.string().transform(it => it.replace(/\D/g, "")).transform(Number),
  description: z.string().default(""),
  category: z.coerce.number(),
  isRecurrent: z.boolean().default(false),
  isEveryDays: z.boolean().default(false),
  initValidity: z.string().date().optional(),
  endValidity: z.string().date().optional()
}).superRefine((attrs, ctx) => {

  if (attrs.value <= 0){
    ctx.addIssue({
      code: "too_small",
      type: "number",
      inclusive: false,
      minimum: 0,
      path:["value"],
    })
  }

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
    return z.NEVER
  }
})

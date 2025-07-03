import { z } from "zod"

export const schemaRecord = z.object({
  value: z.coerce.string().transform(it => it.replace(/\D/g, "")).transform(Number),
  description: z.string(),
  category: z.coerce.number(),
  isRecurrent: z.boolean().default(false),
  isEveryday: z.boolean().default(false),
  initValidity: z.string().optional(),
  endValidity: z.string().optional(),
  date: z.string().optional(),
}).superRefine((attrs, ctx) => {
  if (!attrs.isRecurrent && !attrs.date) {
    ctx.addIssue({
      code: "invalid_type",
      expected: "string",
      received: "undefined",
      path: ["date"]
    })
  }
  if (attrs.isRecurrent && attrs.isEveryday) {
    if (!attrs.initValidity) {
      ctx.addIssue({
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["initValidity"]
      })
    }
    if (!attrs.endValidity) {
      ctx.addIssue({
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["endValidity"]
      })
    }
    const init = new Date(attrs.initValidity!)
    const end = new Date(attrs.endValidity!)
    if (init > end) {
      ctx.addIssue({
        code: "custom",
        message: "A data inicial deve ser menor que a final",
        path: ["initValidity"]
      })
    }
  }
})

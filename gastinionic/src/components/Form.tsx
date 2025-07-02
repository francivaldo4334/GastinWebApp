import { defineComponent, reactive, ref } from "vue";
import { ZodSchema } from "zod";

interface ControllerProps {
  schema: ZodSchema
  default?: any
}

interface ControllerResult {
  errors: Record<string, string>
  fields: any
  trigger: () => boolean;
}

export interface FormFieldProps<T> {
  value: T
  setValue: (value: T) => void
  errorMessage?: string
}

export const Form = defineComponent({
  props: {
    control: {
      type: Object,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  setup(props: any, { slots }) {

    const control: ControllerResult = props.control

    return () => (
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!control.trigger())
          return
        const data = control.fields
        props.onSubmit(data)
      }}>
        {slots.default?.()}
      </form>
    )
  }
})


export const FormField = defineComponent({
  props: {
    control: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    render: {
      type: Function,
      required: true,
    }
  },
  setup(props: any) {

    const control: ControllerResult = props.control
    const fieldName: string = props.name
    const fieldTrigger: (data: any) => any = props.render

    return () => fieldTrigger({
      value: control.fields[fieldName],
      setValue: (value) => (control.fields[fieldName] = value), 
      errorMessage: control.errors[fieldName]
    } as FormFieldProps<any>)
  }
})

export const useForm = (params: ControllerProps): ControllerResult => {
  const errors = reactive({})
  const fields = reactive(
    params.default || {}
  )
  return {
    errors,
    fields,
    trigger() {
      const { error, data } = params.schema.safeParse(fields)
      if (error) {
        const zodErrors = error.formErrors.fieldErrors
        Object.keys(zodErrors).forEach(key => {
          (errors as any)[key] = zodErrors[key]
        })
        return false
      }
      Object.keys(data).forEach(key => {
        (fields as any)[key] = data[key]
      })
      return true
    }
  }
}

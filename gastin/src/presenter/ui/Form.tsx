import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@hope-ui/solid";
import { Accessor, Component, JSXElement, Setter, Show } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import z from "zod";

export type FieldProps<T> = {
  value: Accessor<T>;
  setValue: (value: T) => void;
  errorMessage?: Accessor<string>;
};

type ERROR<SCHEMA extends z.ZodSchema> = Record<keyof z.input<SCHEMA>, string>

type Control<SCHEMA extends z.ZodSchema> = {
  store: [
    get: z.input<SCHEMA>,
    set: SetStoreFunction<z.input<SCHEMA>>
  ];
  errorStore: [
    get: Partial<ERROR<SCHEMA>>,
    set: SetStoreFunction<Partial<ERROR<SCHEMA>>>
  ];
}

const Field = <
  SCHEMA extends z.ZodSchema,
  F = z.input<SCHEMA>,
  K extends keyof F = keyof F
>(props: {
  control: Control<SCHEMA>;
  name: K;
  render: (params: FieldProps<F[K]>) => JSXElement;
  label?: string;
  helpText?: string;
  isRequired?: boolean
}): JSXElement => {
  const [field, setField] = props.control.store
  const [error, setError] = props.control.errorStore
  return <FormControl
    as="fieldset"
    required={props.isRequired}
    invalid={!!error[props.name]}
  >
    <FormLabel as="legend">{props.label}</FormLabel>
    {
      props.render({
        value: () => field[props.name],
        setValue: (value) => {
          setField(props.name as any, value)
        }
      })
    }
    <Show
      when={!!error[props.name]}
    >
      <FormErrorMessage>{error[props.name]}</FormErrorMessage>
    </Show>
    <Show
      when={!!props.helpText}
    >
      <FormHelperText>{props.helpText}</FormHelperText>
    </Show>
  </FormControl>;
};

const Form = <SCHEMA extends z.ZodSchema>(props: {
  schema: SCHEMA;
  onSubmit: (data: z.output<SCHEMA>) => void;
  render: (args: {
    onSubmit: () => void;
    control: Control<SCHEMA>
  }) => JSXElement;
  default?: Partial<z.input<SCHEMA>>;

}): JSXElement => {
  const [form, setForm] = createStore<z.input<SCHEMA>>(props.default || {});
  const [errors, setErrors] = createStore<Partial<ERROR<SCHEMA>>>({});

  const onSubmit = () => {
    Object.keys(errors).forEach(key => {
      //@ts-ignore
      setErrors(key, "")
    })
    const { data, error } = props.schema.safeParse(form)
    if (error) {
      const errorField = error.formErrors.fieldErrors;
      Object.keys(errorField).forEach(key => {
        //@ts-ignore
        setErrors(key, errorField[key]?.join(",") || "")
      })
      return
    }
    props.onSubmit(data)
  };

  return props.render({
    onSubmit,
    control: {
      store: [form, setForm],
      errorStore: [errors, setErrors],
    }
  });
}

interface FormComponent<SCHEMA extends z.ZodSchema> extends Component<Parameters<typeof Form>[0]> {
  Field: typeof Field<SCHEMA>;
}

Form.Field = Field;

export { Form };

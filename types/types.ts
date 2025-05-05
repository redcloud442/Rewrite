export type Option = {
  option_id: string;
  option_label: string;
};

export type Field = {
  field_id: string;
  field_label: string;
  field_type: string;
  field_is_onboarding: boolean;
  field_required: boolean;
  options?: Option[];
};

export type Section = {
  section_id: string;
  section_name: string;
  fields: Field[];
};

export type DynamicFormProps = {
  formId: string;
  sections: Section[];
  defaultValues?: Record<string, string>;
  onSubmit: (data: FormResponse) => void;
};

export type FieldResponse = {
  field_id: string;
  field_label: string;
  field_type: string;
  field_required: boolean;
  field_response: string;
  field_is_onboarding: boolean;
  options?: Option[];
};

export type SectionResponse = {
  section_id: string;
  section_name: string;
  fields: FieldResponse[];
};

export type FormResponse = {
  form_id: string;
  form_name: string;
  sections: SectionResponse[];
};

export type Form = {
  form_id: string;
  form_name: string;
  sections: Section[];
};

export type responseData = {
  field_id: string;
  response_user_id: string;
  response_value: string;
};

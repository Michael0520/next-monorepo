import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form';

interface FormFieldProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  errors: Partial<Record<Path<TFieldValues>, FieldError>>;
  type?: string;
}

type ErrorMessageProps = {
  message?: string;
  id: string;
};
const ErrorMessage = ({ message, id }: ErrorMessageProps) => (
  <p id={id} className="text-red-500 text-sm mt-2 mx-2 fade-in">
    {message}
  </p>
);

const FormField = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  errors,
  type = 'text',
}: FormFieldProps<TFieldValues>) => (
  <div className="mb-4 md:mb-6">
    <label htmlFor={name} className="block mb-2 text-sm md:text-base">
      {label}
    </label>
    <input
      {...register(name)}
      id={name}
      type={type}
      placeholder={placeholder}
      className="border w-full pt-5 pb-6 px-5 border-[color:var(--neutral-300,#EFF0F6)] shadow-[0px_2px_6px_0px_rgba(19,18,66,0.07)] rounded-full text-sm md:text-base"
      aria-invalid={errors[name] ? 'true' : 'false'}
      aria-describedby={`${name}-error`}
    />
    {errors[name] && (
      <ErrorMessage id={`${name}-error`} message={errors[name]?.message} />
    )}
  </div>
);

export default FormField;

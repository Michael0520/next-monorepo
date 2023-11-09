import { forwardRef, useImperativeHandle } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from './form-field';

const validateNameFormat = (name: string) => {
  const parts = name.split(' ');
  if (parts.length !== 2) return false;
  return parts.every((part) => part.charAt(0) === part.charAt(0).toUpperCase());
};

const schema = yup
  .object({
    name: yup
      .string()
      .required('名稱是必填項目')
      .test(
        'isValidName',
        '名稱格式不正確（需兩個字串，每個字串首字母需大寫）, e.g. Michael Lo',
        validateNameFormat
      ),
    email: yup
      .string()
      .email('請輸入有效的電子郵件')
      .required('電子郵件是必填項目'),
    phoneNumber: yup
      .string()
      .required('電話號碼是必填項目')
      .matches(/^09\d{8}$/, {
        message: '電話號碼格式不正確（需以09開頭，共10位數字）',
      }),
    company: yup.string().required('公司名稱是必填項目'),
  })
  .required();

interface IFormInput {
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
}

const Step1Form = forwardRef((_, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useImperativeHandle(ref, () => ({
    async triggerValidation() {
      return await trigger();
    },
  }));

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <FormField label="Name" name="name" register={register} errors={errors} />
      <FormField
        label="Email"
        name="email"
        register={register}
        errors={errors}
        type="email"
      />
      <FormField
        label="Phone Number"
        name="phoneNumber"
        register={register}
        errors={errors}
        type="tel"
      />
      <FormField
        label="Company"
        name="company"
        register={register}
        errors={errors}
      />
    </form>
  );
});

Step1Form.displayName = 'Step1Form';

export default Step1Form;

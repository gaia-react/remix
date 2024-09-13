import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useSubmit} from '@remix-run/react';
import {useForm} from '@rvf/remix';
import Button from '~/components/Button';
import FormActions from '~/components/Form/FormActions';
import FormError from '~/components/Form/FormError';
import InputEmail from '~/components/Form/InputEmail';
import InputPassword from '~/components/Form/InputPassword';
import validators from '~/validators';

const LoginPage: FC = () => {
  const {t} = useTranslation('auth');

  const submit = useSubmit();

  const form = useForm({
    defaultValues: {email: 'user@domain.com', password: ''},
    handleSubmit: (formData) => submit(formData, {method: 'post'}),
    submitSource: 'dom',
    validator: validators.auth.login,
  });

  return (
    <section className="mx-auto w-full max-w-screen-sm space-y-4 px-4 py-12">
      <h1 className="text-2xl font-bold">{t('login')}</h1>
      <form className="hide-required space-y-6" {...form.getFormProps()}>
        <InputEmail
          error={
            form.error('email') ? t('invalidEmail', {ns: 'errors'}) : undefined
          }
          required={true}
          {...form.getInputProps('email')}
        />
        <InputPassword
          error={
            form.error('password') ?
              t('invalidPassword', {ns: 'errors'})
            : undefined
          }
          required={true}
          {...form.getInputProps('password')}
        />
        <FormError hide={form.formState.isSubmitting} />
        <FormActions>
          <Button isLoading={form.formState.isSubmitting} type="submit">
            {t('login')}
          </Button>
        </FormActions>
      </form>
    </section>
  );
};

export default LoginPage;

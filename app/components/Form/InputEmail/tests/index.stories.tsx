import {useTranslation} from 'react-i18next';
import {useForm} from '@rvf/remix';
import {withZod} from '@rvf/zod';
import type {Meta, StoryFn} from '@storybook/react';
import stubs from 'test/stubs';
import {z} from 'zod';
import Button from '~/components/Button';
import FormActions from '~/components/Form/FormActions';
import InputEmail from '../index';

const meta: Meta = {
  component: InputEmail,
  decorators: [stubs.remix()],
  parameters: {
    controls: {hideNoControlsWarning: true},
  },
  title: 'Form/Input/Email',
};

export default meta;

const validator = withZod(z.object({email: z.string().email()}));

export const Default: StoryFn = () => {
  const {t} = useTranslation('errors');

  const form = useForm({
    defaultValues: {email: ''},
    validator,
  });

  return (
    <form className="max-w-md space-y-4 p-4" {...form.getFormProps()}>
      <InputEmail
        error={form.error('email') ? t('invalidEmail') : undefined}
        name="email"
      />
      <FormActions>
        <Button type="submit">{t('form.submit', {ns: 'common'})}</Button>
      </FormActions>
    </form>
  );
};

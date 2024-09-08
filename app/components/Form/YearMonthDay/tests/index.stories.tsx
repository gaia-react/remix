import {useForm} from '@rvf/remix';
import {withZod} from '@rvf/zod';
import type {Meta, StoryFn} from '@storybook/react';
import stubs from 'test/stubs';
import {z} from 'zod';
import YearMonthDay from '../index';

const meta: Meta = {
  component: YearMonthDay,
  decorators: [stubs.remix()],
  parameters: {
    controls: {hideNoControlsWarning: true},
  },
  title: 'Form/YearMonthDay',
};

export default meta;

const validator = withZod(z.object({dob: z.string().date()}));

export const Default: StoryFn = () => {
  const form = useForm({validator});

  return (
    <form className="max-w-md p-4" {...form.getFormProps()}>
      <YearMonthDay {...form.getControlProps('dob')} />
    </form>
  );
};

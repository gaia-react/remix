import {factory} from '@mswjs/data';
import things from './things';
import user from './user';

const en = factory({
  things: things.schema,
  user: user.schema,
});

const ja = factory({
  things: things.schema,
  user: user.schema,
});

export const resetTestData = () => {
  en.user.delete({
    where: {
      id: {
        equals: '1',
      },
    },
  });
  ja.user.delete({
    where: {
      id: {
        equals: '1',
      },
    },
  });

  en.things.deleteMany({
    where: {
      id: {
        notIn: ['0'],
      },
    },
  });
  ja.things.deleteMany({
    where: {
      id: {
        notIn: ['0'],
      },
    },
  });

  en.user.create(user.en);
  ja.user.create(user.ja);

  things.en.forEach(en.things.create);
  things.ja.forEach(ja.things.create);
};

resetTestData();

export default {en, ja} as Record<string, typeof en>;

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

en.user.create(user.en);
ja.user.create(user.ja);

things.en.forEach(en.things.create);
things.ja.forEach(ja.things.create);

export default {en, ja} as Record<string, typeof en>;

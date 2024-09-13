import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import i18next from '~/i18next.server';
import IndexPage from '~/pages/Public/IndexPage';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request, 'pages');
  const title = t('index.meta.title');
  const description = t('index.meta.description');

  return json({description, title});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
  {
    content: data?.description,
    name: 'description',
  },
];

const IndexRoute = () => <IndexPage />;

export default IndexRoute;

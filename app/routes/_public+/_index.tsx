import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import i18next from '~/i18next.server';
import IndexPage from '~/pages/Public/IndexPage';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request, 'pages');
  const title = t('index.meta.title');
  const description = t('index.meta.description');

  return {description, title};
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

import { ssrMiddleware } from 'quasar/wrappers';
import Api from 'src-ssr/api';

export default ssrMiddleware(async ({ app }) => {
  new Api(app);
});

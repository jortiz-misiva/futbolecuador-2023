import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const apiClient = axios.create({
  baseURL: process.env.PROD
    ? `${process.env.BASE_URL}/api`
    : 'http://localhost:8001/api',
  // 'http://192.168.2.99:8001/api',
  // : 'http://192.168.2.215:8002/api',
});

const apiServer = axios.create({
  baseURL: process.env.PROD
    ? `${process.env.BASE_URL}/api`
    : // : 'http://192.168.2.99:8001/api',
      'http://localhost:8001/api',
  // : 'http://192.168.2.215:8002/api',
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = apiClient;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { apiClient, apiServer };

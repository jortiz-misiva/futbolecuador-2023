import { iframeResizer } from 'iframe-resizer';

const useDatafactory = () => {
  const resizeIframe = (id: string) => {
    if (process.env.SERVER) return;
    const tag = `#${id}`;
    iframeResizer({ log: false }, tag);
  };

  return {
    resizeIframe,
  };
};

export default useDatafactory;

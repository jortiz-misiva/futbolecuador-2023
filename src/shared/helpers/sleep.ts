const sleep = async (timeout: number) => {
  await new Promise<boolean>((res) => {
    setTimeout(() => {
      res(true);
    }, timeout);
  });
};

export default sleep;

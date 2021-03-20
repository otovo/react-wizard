export const someAsyncFunc = () =>
  new Promise(res =>
    setTimeout(() => {
      console.log('inner timeout done');
      res();
    }, 800),
  );

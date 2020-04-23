export const someAsyncFunc = (shouldPass = true) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log('inner timeout done', shouldPass);
      if (shouldPass) {
        return resolve();
      }
      return reject();
    }, 800),
  );

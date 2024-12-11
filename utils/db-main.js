import dbClient from './db';

const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;
    const repeatFct = async () => {
      await setTimeout(async () => {
        i += 1;
        if (i >= 10) {
          reject('Connection timeout');
        } else if (!dbClient.isAlive()) {
          await repeatFct();
        } else {
          resolve();
        }
      }, 1000);
    };
    repeatFct();
  });
};

(async () => {
  // Initial connection check (may be false if DB is not connected yet)
  console.log(dbClient.isAlive());

  // Attempt to wait for a successful connection (retry up to 10 times)
  await waitConnection();
  
  // After successful connection
  console.log(dbClient.isAlive());  // should be true after connection
  console.log(await dbClient.nbUsers());  // Number of users in the 'users' collection
  console.log(await dbClient.nbFiles());  // Number of files in the 'files' collection
})();

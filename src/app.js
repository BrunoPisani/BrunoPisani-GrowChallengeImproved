const express = require('express');
const { populateCache } = require('./utils/swapiTools');

const app = express();
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes/api.js');

app.use('/api', apiRoutes);

const init = async function () {
  console.log('API initializing...');
  console.log('Populating cache...')
  populateCache()
    .catch(console.error)
    .then(() => {
      app.listen(port, () => {
        console.log('API Started!')
        console.debug(`Running on port ${port}`);
      });
    }
  );
};

init();

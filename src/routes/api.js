const apiRoutes = require('express').Router();
const { mapToSortFunction } = require('../utils/sortingTools');
const { getPeople, getPlanets } = require('../utils/swapiTools');

apiRoutes.get('/people', async (req, res) => { 
  try {
    // We make a copy to remove the undefined element people[0]:
    const people = [...await getPeople()];
    people.shift();

    const sortFunction = mapToSortFunction(req.query.sortBy);
    const result = (sortFunction) 
      ? people.sort(sortFunction) 
      : people;

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send('Error: problem getting people data.');
  }
});

apiRoutes.get('/planets', async (req, res) => {
  try {
    const planets = await getPlanets();

    return res.status(200).json(planets); 
  } catch (e) {
    return res.status(500).send('Error: problem getting planets data.');
  }
});

module.exports = apiRoutes;

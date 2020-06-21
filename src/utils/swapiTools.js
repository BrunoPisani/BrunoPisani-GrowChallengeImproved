const axios = require('axios');

const cache = {};

const queryPeople = async function () {
  console.log('query swapi for people');
  let people = [];
  let nextPage = 'https://swapi.dev/api/people/?page=1';
  
  while (nextPage !== null) {
    console.log(nextPage);
    try {
      const pageData = (await axios.get(nextPage)).data;
      const pageResults = pageData.results;
    
      /* 
        swapi is returning error 404 for /people/17/, the following code 
        is done this way so we can get values by key easily later:
      */
      for(let i = 0; i < pageResults.length; i++) {
        const id = pageResults[i].url.match(/\/(\d+)/)[1];
        people[id] = pageResults[i];
      }

      nextPage = pageData.next;
    } catch (e) {
      throw new Error('Method queryPeople(): ' + e);
    }
  }
  return people;
};

const queryPlanets = async function () {
  console.log('query swapi for planets');
  let planets = [];
  let nextPage = 'https://swapi.dev/api/planets/?page=1';
  
  while (nextPage !== null) {
    console.log(nextPage);
    try {
      const pageData = (await axios.get(nextPage)).data;

      // This can be done this way because we won't need to get planets by key:
      planets = [...planets, ...pageData.results];

      nextPage = pageData.next;
    } catch (e) {
      throw new Error('Method queryPlanets(): ' + e);
    }
  }
  return planets;
};

const getPeople = async function () {
  if (typeof cache.people === 'undefined') {
    let people;
    try {
      people = await queryPeople();
    } catch (e) {
      console.error('Method getPeople(): ' + e.message);
    }
    cache.people = people;
  }
  return cache.people;
};

const getPlanets = async function () {
  const people = await getPeople();
  if (typeof cache.planets === 'undefined') {
    let planets = [];
    try {
      const planetsData = await queryPlanets();
      for (let i = 0; i < planetsData.length; i++) {
        let residents = planetsData[i].residents;
        for (let j = 0; j < residents.length; j++) {
          let id = residents[j].match(/\/(\d+)/)[1];
          residents[j] = (people[id])
            ? people[id].name 
            : residents[j];
        }
        planets.push(planetsData[i]);
      }
    } catch (e) {
      console.error('Method getPlanets(): ' + e.message);
    }
    cache.planets = planets;
  }
  return cache.planets;
};

const populateCache = getPlanets;

module.exports = { getPeople, getPlanets, populateCache };

const sortByHeight = function (a,b) {
  // This is to manipulate "unknown" or not valid values and numbers >= "1,000":
  const aHeight = (parseFloat(a.height)) 
    ? parseFloat(a.height.replace(',', '')) 
    : -1;
  const bHeight = (parseFloat(b.height)) 
    ? parseFloat(b.height.replace(',', '')) 
    : -1;
  if (parseInt(aHeight) > parseInt(bHeight)) {
    return 1;
  }
  return -1;
}

const sortByMass = function (a,b) {
  // This is to manipulate "unknown" or not valid values and numbers >= "1,000":
  const aMass = (parseFloat(a.mass)) ? parseFloat(a.mass.replace(',', '')) : -1;
  const bMass = (parseFloat(b.mass)) ? parseFloat(b.mass.replace(',', '')) : -1;
  if (aMass > bMass) {
    return 1;
  }
  return -1;
}

const sortByName = function (a,b) {
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return -1;
}

const sortByFunctionsMap = {
  height: sortByHeight,
  mass: sortByMass,
  name: sortByName
};

exports.mapToSortFunction = function (key) {
  const sortFunction =  sortByFunctionsMap[key] ? sortByFunctionsMap[key] : null;
  return sortFunction;
};

const request = require('request-promise-native');


const fetchMyIP = function() {
  const url = 'https://api.ipify.org?format=json';
  return request(url);
};

const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip;
  return request(`http://ipwho.is/${IP}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data)
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };




const API_ENDPOINT = 'https://swapi.dev/api/';

function apiCall(url) {
    return fetch(url)
        .then(res => res.json());
}

function getPlanetById(planetId) {
    return apiCall(`${API_ENDPOINT}planets/${planetId}/`);
}

console.log(JSON.parse( getPlanetById(1) ));
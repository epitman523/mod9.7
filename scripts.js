'use strict'

const baseURL = 'https://developer.nps.gov/api/v1/';
const apiKey = 'a4XGjvJiyzsKuEWxfhRO9WtObErCGID9qffSqElG';

function getParkData(query, maxResult = 10) {
    const params = {
        stateCode: query,
        limit: maxResult,
        fields: addresses,
        api_key: apiKey
    };

}
function formatUserState(string) {
    const stateArr = string.toUpperCase().replace(/\s/g, '').split(',');
    return stateArr;
}
function watchForm() {
    $('#searchParks').submit(event => {
        event.preventDefault();
        const userState = formatUserState($('#js-search-term').val());
        const userMax = $('#js-max-results').val();
        console.log('watchForm is working');
    });
}

$(watchForm());

//1. Watch for for submission
//2. On submit capture 2 values
    //2.1 State
    //2.2 Max Results
//3. Send both values to a get function
//4. Send state value through formatting function
    //4.1 Split string value into array at commas
    //4.2 Any other filters necessary?
//5. Create query string for link
//6. Fetch data from API
//7. Display data
'use strict'

const baseURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'a4XGjvJiyzsKuEWxfhRO9WtObErCGID9qffSqElG';
function formatUserState(string) {
    const stateArr = string.toUpperCase().replace(/\s/g, '').split(',');
    return stateArr;
}
function formatParamsString(params) {
    let paramsString = Object.keys(params)
        .map(key => `${(key)}=${params[key]}`)
    return (paramsString.join('&'));
}
function displayParkData(responseJSON) {
    $('.js-parks-list').empty();
    if (responseJSON.data.length === 0) {
        $('.js-parks-list').append('<li><p>Your search terms did not return any matches</p></li>');
    }
    for (let i = 0; i < responseJSON.data.length; i++) {
        $('.js-parks-list').append(
            `<li>
                <p class="full-name">${responseJSON.data[i].fullName}</p>
                <p class="description">${responseJSON.data[i].description}</p>
                <p class="url"><a href="${responseJSON.data[i].url}" target="_blank">${responseJSON.data[i].url}</a></p>
                <p>Address:<br> ${responseJSON.data[i].addresses[0].line1}<br> ${responseJSON.data[i].addresses[0].line2} ${responseJSON.data[i].addresses[0].line3} ${responseJSON.data[i].addresses[0].city}, ${responseJSON.data[i].addresses[0].stateCode} ${responseJSON.data[i].addresses[0].postalCode}
                </p>
            </li>`
        );
    }
}
function getParkData(query, maxResult) {
    const params = {
        stateCode: query,
        limit: maxResult,
        fields: ['addresses'],
        api_key: apiKey
    };
    let newParamsString = formatParamsString(params);
    let url = baseURL + '?' + newParamsString;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => displayParkData(responseJSON))
        //.then(responseJSON => console.log(responseJSON))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}
function watchForm() {
    $('#searchParks').submit(event => {
        event.preventDefault();
        const userState = formatUserState($('#js-search-term').val());
        const userMax = $('#js-max-results').val();
        getParkData(userState, userMax);
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
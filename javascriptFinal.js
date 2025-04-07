function loadPage(page){
    if(page == 'index'){
        location.reload();
        return;
    }

    fetch(`${page}.html`)
        .then(response => response.text())
        .then(data => {
                document.getElementById('page-section').innerHTML = data;

                const searchBar = document.getElementById('searchbar');

                if(page != 'index'){
                    searchBar.style.visibility = "hidden";
                }else{
                    searchBar.style.visibility = "visible";
                }
        })
        .catch(error => console.error('Error loading page: ', error))
}


const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function() {

    fetch('../javascriptFinal_api.json')
    .then(response => response.json())
    .then(json => {

        const searchResult = document.getElementById('search-result');
        const searchInput = document.getElementById('search-input').value;
        let searchInputLower = searchInput.toLowerCase();

        const resultOne = document.getElementById('result-1');
        const resultTwo = document.getElementById('result-2');

        let randomNumberThree = Math.floor(Math.random() * 3);
        let randomNumberTwo = Math.floor(Math.random() * 2);

        if(searchInputLower == 'beach' || searchInputLower == 'beaches'){
            searchInputLower = 'beaches';
        } else if(searchInputLower == 'temple' || searchInputLower == 'temples'){
            searchInputLower = 'temples';
        } else if(searchInputLower == 'country' || searchInputLower == 'countries'){
            searchInputLower = 'countries';
        }

        if(searchInputLower == 'countries'){
            
            const countryOne = json.countries[randomNumberThree];
            if (countryOne) {
                const foundCityOne = countryOne.cities[randomNumberTwo];
                if (foundCityOne) {
                    resultOne.querySelector('img').src = foundCityOne.imageUrl;
                    resultOne.querySelector('h4').textContent = foundCityOne.name;
                    resultOne.querySelector('p').textContent = foundCityOne.description;
                }
            }

            let nextCountryIndex = (randomNumberThree + 1) % 3;
            const countryTwo = json.countries[nextCountryIndex];
            if (countryTwo) {
                const foundCityTwo = countryTwo.cities[randomNumberTwo];
                if (foundCityTwo) {
                    resultTwo.querySelector('img').src = foundCityTwo.imageUrl;
                    resultTwo.querySelector('h4').textContent = foundCityTwo.name;
                    resultTwo.querySelector('p').textContent = foundCityTwo.description;
                }
            }
        }

        searchResult.style.visibility = 'visible';

    })
    .catch(error => console.error('Error fetching the JSON:', error));

});


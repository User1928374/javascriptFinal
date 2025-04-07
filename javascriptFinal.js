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
                const searchResult = document.getElementById('search-result');

                if(page != 'index'){
                    searchBar.style.visibility = "hidden";
                    searchResult.style.display = "none";
                }else{
                    searchBar.style.visibility = "visible";
                    searchResult.style.visibility = "visible";
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
        let nextCountryIndex = (randomNumberThree + 1) % 3;

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

            const countryTwo = json.countries[nextCountryIndex];
            if (countryTwo) {
                const foundCityTwo = countryTwo.cities[randomNumberTwo];
                if (foundCityTwo) {
                    resultTwo.querySelector('img').src = foundCityTwo.imageUrl;
                    resultTwo.querySelector('h4').textContent = foundCityTwo.name;
                    resultTwo.querySelector('p').textContent = foundCityTwo.description;
                }
            }
        }else if(searchInputLower == 'temples'){
            const templeOne = json.temples[randomNumberTwo];
            const nextTempleIndex = (randomNumberTwo + 1) % 2;

            const templeTwo = json.temples[nextTempleIndex];
            
            resultOne.querySelector('img').src = templeOne.imageUrl;
            resultOne.querySelector('h4').textContent = templeOne.name;
            resultOne.querySelector('p').textContent = templeOne.description;

            resultTwo.querySelector('img').src = templeTwo.imageUrl;
            resultTwo.querySelector('h4').textContent = templeTwo.name;
            resultTwo.querySelector('p').textContent = templeTwo.description;

        }else if(searchInputLower == 'beaches'){
            const beachOne = json.beaches[randomNumberTwo];
            const nextBeachIndex = (randomNumberTwo + 1) % 2;

            const beachTwo = json.beaches[nextBeachIndex];
            
            resultOne.querySelector('img').src = beachOne.imageUrl;
            resultOne.querySelector('h4').textContent = beachOne.name;
            resultOne.querySelector('p').textContent = beachOne.description;

            resultTwo.querySelector('img').src = beachTwo.imageUrl;
            resultTwo.querySelector('h4').textContent = beachTwo.name;
            resultTwo.querySelector('p').textContent = beachTwo.description;
        }

        searchResult.style.visibility = 'visible';

    })
    .catch(error => console.error('Error fetching the JSON:', error));

});

const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', function(){
    const searchResult = document.getElementById('search-result');

    const resultOne = document.getElementById('result-1');
    const resultTwo = document.getElementById('result-2');
    
    resultOne.querySelector('img').src = '';
    resultOne.querySelector('h4').textContent = '';
    resultOne.querySelector('p').textContent = '';
    resultTwo.querySelector('img').src = '';
    resultTwo.querySelector('h4').textContent = '';
    resultTwo.querySelector('p').textContent = '';

    searchResult.style.display = 'none';
});


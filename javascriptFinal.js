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
/*document.addEventListener('DOMContentLoaded' , () => loadPage('home'));*/

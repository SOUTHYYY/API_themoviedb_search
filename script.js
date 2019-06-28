// team SOUTHYYY
const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies");

function apiSearch(event){
    event.preventDefault(); // Отмена презеагрузки страницы
    
    const searchText = document.querySelector(".form-control").value;
    const server = "https://api.themoviedb.org/3/search/multi?api_key=a58a5dfdb3a5b366517bf064878d351b&language=ru&query=" + searchText;

    requestApi(server);
}

searchForm.addEventListener("submit", apiSearch);

function requestApi( url){
    
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

    request.addEventListener('readystatechange', function (){
        if(request.readyState !== 4){
            movie.innerHTML = "Loading...";
            return;
        }

        if(request.status !==200){
            movie.innerHTML = "Упс, что-то пошло не так...";
            console.log("error: " + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);

        let inner = "";

        output.results.forEach(function (item){
            let nameItem = item.name || item.title;
            let dateItem = item.first_air_date || item.release_date;
            let image = "https://image.tmdb.org/t/p/w500" + item.backdrop_path;

            console.log(nameItem);
            console.log(dateItem);

            inner += 
                `<div class="col m-2"> 
                    <div class="card" style="width: 15rem; margin: auto;"> 
                        <img src="${image}" class="card-img-top" alt="${nameItem}"> 
                    <div class="card-body" style="overflow: hidden;"> 
                    <h5 class="card-title">${nameItem}</h5> 
                    <p class="card-text" style="height: 12rem;">${item.overview}</p> 
                </div> 
                <div class="text-center py-2"> 
                    <span class="badge badge-danger">RATE: ${item.vote_average}</span> 
                </div> 
                <a href="https://www.themoviedb.org/" class="btn btn-warning">Watch a movie</a> 
                </div> 
                </div> 
                </div>` 
        })

        movie.innerHTML = inner;
        
        console.log(output);
    });
}
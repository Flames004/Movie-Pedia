// APIs
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"; //most popular movie
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="; //searched movie
const movieBox = document.querySelector("#movie-box");

const getMovies = async (api) => {
    const response = await fetch(api)
    const data = await response.json()
    console.log(data);
    showMovies(data.results);
}

const showMovies = (data) => {
    movieBox.innerHTML = ""; //empty the movie box
    data.forEach(
        (item) => {
            const box = document.createElement("div")
            box.classList.add("relative", "group", "h-96", "sm:h-96", "lg:h-[420px]", "overflow-hidden", "w-64", "sm:w-64", "lg:w-[280px]", "rounded-lg", "shadow-black", "shadow-2xl", "mx-auto")
            box.innerHTML = `
            <img src="${IMGPATH + item.poster_path}" alt="Image not available" class="h-full w-full">
            <div class="overlay w-full max-h-full rounded-t-xl rounded-b-md absolute bg-white p-4 -bottom-full group-hover:bottom-0 transition-all shadow-inner shadow-gray-500 overflow-auto">
                <div class="title flex justify-between">
                    <h2 class="text-3xl">${item.original_title}</h2>
                    <span class="text-2xl text-orange-600 font-bold">${item.vote_average}</span>
                </div>
                <h3 class="mt-2 font-medium text-lg">Overview:</h3>
                <p class="text-sm">${item.overview}</p>
            </div>
            `;
            movieBox.appendChild(box);
        }
    )
}

document.querySelector("#search").addEventListener(
    "keydown",
    function (e) {
        // console.log(e.target.value);
        if (e.target.value != "") {
            getMovies(SEARCHAPI + e.target.value); //searched movies
        } else {
            getMovies(APIURL); //popular movies
        }
    }
)


//initial call
getMovies(APIURL);

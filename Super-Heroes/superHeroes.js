const moviesUL = document.getElementById("moviesUL")
const movieLink = document.getElementById("movieLink")
const moviesDiv = document.getElementById("moviesDiv")

let request = new XMLHttpRequest()

request.addEventListener('load', function(){
    const postsAPI = JSON.parse(this.responseText)
    const posts = postsAPI.Search
    const spiderManItems = posts.map(function(post) {
        return spiderManItem = `<li>
                                <img src="${post.Poster}" width=150px><br>
                                <b>${post.Title}</b><br>
                                <button data-movieId ="${post.imdbID}" onclick = "showDetails(this)">Show Details</button>
                                </li>`
        //return spiderManItem
    })
    moviesUL.innerHTML = spiderManItems.join("")
    
})

function showDetails(btn) {
    const movieId = btn.getAttribute('data-movieId')
    const selectedMovieURL = `https://www.omdbapi.com/?i=${movieId}&apikey=69cc8df0`
    let request2 = new XMLHttpRequest
    request2.open("GET", selectedMovieURL)
    request2.send()
    request2.addEventListener('load', function() {
        const data = JSON.parse(this.responseText)
        const movieDetails = `<div id="details">
                                <h1>${data.Title}</h1>
                                <img src="${data.Poster}"/>
                                <div id="info">
                                    <h3>Release Date: ${data.Released}</h3>
                                    <h3>Rated: ${data.Rated}</h3>
                                    <h3>Director: ${data.Director} </h3>
                                    <h3>IMDB Rating: ${data.imdbRating} </h3>
                                </div>
                            </div>`
        moviesDiv.innerHTML = movieDetails
        })
        
}



request.open('GET', "https://www.omdbapi.com/?s=spider-man&apikey=69cc8df0")
request.send()
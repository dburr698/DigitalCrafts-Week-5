const newsUL = document.querySelector("#newsUL")

async function getStoryIds(getData) {
    const storyIdUrl = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    
    let response = await fetch(storyIdUrl)
    let storyIds = await response.json()
    console.log(storyIds)
    getData(storyIds)
    
}

function getNewsData(newsIds) {
    let newsData = newsIds.map(async function(ID) {
        let newsResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ID}.json?print=pretty`)
        let data = await newsResponse.json()
        return data
    })
    
    console.log(newsData)
}



function displayNews(newsArticles) {
    const newsItems = newsArticles.map(function(data) {
        return `<li>
        <label>${data.title}</label>
        <a href="${data.url}">Link to Story</a>
        <p>${data.by}</p>
        <p>${data.time}</p>
    </li>`
    })
    newsUL.innerHTML = newsItems.join("")
}


getStoryIds(function(Ids) {
    getNewsData(Ids)
})
// console.log(getStoryIds())
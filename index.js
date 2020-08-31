

const fs = require('fs')
const axios = require('axios');
const cheerio = require('cheerio')


const url = `https://o2tvseries.com/search/recently_added`

const getNewMovies = async() => {
    const response = await axios(url)
    const html = response.data
    const $ = cheerio.load(html)
    const recently_added = $('.data_list > div')
    console.log(recently_added.length)
    let newMovies = ''

    recently_added.each(function () {
        const movie = $(this).contents().text().replace(/\s\s+/g, '')
        newMovies += `${movie} \n`
    })

    console.log(newMovies)
    fs.writeFileSync('newmovies.txt', newMovies)
    return newMovies
}

getNewMovies()


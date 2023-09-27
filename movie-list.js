import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

let movies = []

const getMovies = async (page, from, to) => {
    const path = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&release_date.gte=${from}&release_date.lte=${to}&sort_by=popularity.desc&with_original_language=en&without_genres=16`
    const response = await fetch(path, {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_KEY}`
        }
    })

    const { results } = await response.json()

    return results
}

const run = async () => {
    const from = process.argv[2] || '1900'
    const to = process.argv[3] || '2000'

    let page = 1

    // the movie db is limited to 20 per page, I want at least 250
    while (page < 14)
    {
        const results = await getMovies(page, from, to)

        movies = [...results, ...movies]
        page++
    }

    fs.writeFileSync(`./data/movies-${from}-${to}.json`, JSON.stringify(movies, '', 2))
}

run()
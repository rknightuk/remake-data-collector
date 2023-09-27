import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const getCast = async (movieId) => {
    const path = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
    const response = await fetch(path, {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_KEY}`
        }
    })

    const { cast } = await response.json()

    return cast
}

const run = async () => {
    const filePath = `./data/${process.argv[2]}.json`
    const movies = JSON.parse(fs.readFileSync(filePath))
    const moviesWithCast = []

    for (let index = 0; index < movies.length; index++) {
        const movie = movies[index];
        console.log(`Running for ${movie.title}`)
        const cast = await getCast(movie.id)
        moviesWithCast.push({
            ...movie,
            cast,
        })
        await new Promise(r => setTimeout(r, 500));
    }

    fs.writeFileSync(`./data/${process.argv[2]}-cast.json`, JSON.stringify(moviesWithCast, '', 2))
}

run()
import fs from 'fs'

const data = JSON.parse(fs.readFileSync('./data/movies-1900-2000-cast.json'))

const movies = data.map(m => {
    return {
        title: m.title,
        year: m.release_date.split('-')[0],
        characters: m.cast.slice(0, 3).map(c => {
            return {
                character: c.character,
                gender: c.gender,
            }
        })
    }
})

fs.writeFileSync('./data/movies.json', JSON.stringify(movies, '', 2))
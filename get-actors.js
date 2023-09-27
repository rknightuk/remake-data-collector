import fs from 'fs'

const women = []
const men = []

const data = JSON.parse(fs.readFileSync('./data/movies-2010-2023-cast.json'))

data.every(m => {
    m.cast.slice(0, 5).every(c => { // get top 5 only
        if (c.gender === 1) women.push(c.name)
        if (c.gender === 2) men.push(c.name)
        return true
    })
    return true
})


fs.writeFileSync('./data/actors.json', JSON.stringify({ men, women }, '', 2))
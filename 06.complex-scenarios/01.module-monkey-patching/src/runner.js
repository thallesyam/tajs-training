import Service from '../src/service.js'

async function run(item) {
  const service = new Service('heroes')
  const hero = service.createHero(item)
  console.log('Creating hero: ', hero)
  const heroes = service.listHeroes()
  console.log('Listing Heroes: ', heroes);
}

export { run }
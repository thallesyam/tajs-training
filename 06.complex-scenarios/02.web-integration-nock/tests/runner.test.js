import { it, expect, describe } from '@jest/globals'
import { fetchAPIByPage } from '../src/runner.js'
import page01Fixure from '../fixures/get-page01.json'
import page02Fixure from '../fixures/get-page02.json'
import nock from 'nock'


describe('Web Integration Test Suite', () => {
  it('should return the right object with right properties', async () => {
    const scope = nock(`https://rickandmortyapi.com/api`)
    .get('/character/')
    .query({ page: 1 })
    .reply(
      200,
      page01Fixure
    )
    
    const page01 = await fetchAPIByPage()
    expect(page01).toEqual([{"id": 1, "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg", "name": "Rick Sanchez"}])
    scope.done()
  })

  it('should return the right object with right properties', async () => {
    const scope = nock(`https://rickandmortyapi.com/api`)
    .get('/character/')
    .query({ page: 2 })
    .reply(
      200,
      page02Fixure
    )
    
    const page02 = await fetchAPIByPage(2)
    expect(page02).toEqual([
      {
          "id": 21,
         "image": "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
         "name": "Aqua Morty"
      }
    ])
    scope.done()
  })

})

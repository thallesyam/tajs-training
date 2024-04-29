import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import mapPerson from '../src/person.js'

describe('Task test suite', () => {
  it('should mapping person correctly', () => {
    const personStr = '{"name":"Thalles","age":23}'
    const personObj = mapPerson(personStr)
    expect(personObj).toEqual({
      name: 'Thalles',
      age: 23,
      createdAt: expect.any(Date)
    })
  })

  it('should not map person given invalid JSON String', () => {
    const personStr = '{"name":'
    expect(() => mapPerson(personStr))
    .toThrow('Unexpected end of JSON input')
  })

  it('should not map person given invalid JSON data', () => {
    const personStr = '{}'
    const personObj = mapPerson(personStr)
    expect(personObj).toEqual({
      name: undefined,
      age: undefined,
      createdAt: expect.any(Date)
    })
  })
})
import { describe, it, beforeAll, afterAll, expect, jest } from '@jest/globals'
import { server } from '../src/api.js'

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once('error', (err) => reject(err))
    server.once('listening', () => resolve())
  })
}

describe('API Users E2E Suite', () => {
  let _testServer
  let _testServerAddress

  function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`)
    return user.json()
  }

  beforeAll(async () => {
    _testServer = server.listen()
    await waitForServerStatus(_testServer)
    const serverInfo = _testServer.address()
    _testServerAddress = `http://localhost:${serverInfo.port}`
  })

  afterAll(done => {
    server.closeAllConnections()
    _testServer.close(done)
  })

  it('should register a new user with young-adult category', async () => {
    const expectedCategory = 'young-adult'
    jest.useFakeTimers({
      now: new Date('2024-04-30T00:00')
    })
    const response = await createUser({
      name: 'Xuxa da Silva',
      birthDay: '2000-01-01'
    })
    expect(response.status).toBe(201)
    const result = await response.json()
    expect(result.id).not.toBeUndefined()
    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)
  })
  it('should register a new user with adult category', async () => {
    const expectedCategory = 'adult'
    jest.useFakeTimers({
      now: new Date('2024-04-30T00:00')
    })
    const response = await createUser({
      name: 'Xuxa da Silva',
      birthDay: '1980-01-01'
    })
    expect(response.status).toBe(201)
    const result = await response.json()
    expect(result.id).not.toBeUndefined()
    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)
  })

  it('should register a new user with senior category', async () => {
    const expectedCategory = 'senior'
    jest.useFakeTimers({
      now: new Date('2024-04-30T00:00')
    })
    const response = await createUser({
      name: 'Xuxa da Silva',
      birthDay: '1960-01-01'
    })
    expect(response.status).toBe(201)
    const result = await response.json()
    expect(result.id).not.toBeUndefined()
    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)
  })

  it('should throw an error when registering a under-age user', async () => {
    const response = await createUser({
      name: 'Xuxa da Silva',
      birthDay: '2020-01-01'
    })
    expect(response.status).toBe(400)
    const result = await response.json()
    expect(result).toEqual({
      message: 'User must be 18yo or older'
    })
  })
})

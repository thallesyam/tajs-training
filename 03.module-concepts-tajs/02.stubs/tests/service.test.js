import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import Service from '../src/service.js'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'

describe('Service test suite', () => {
  let _service
  const filename = 'testfile.ndjson'

  beforeEach(() => {
    _service = new Service({
      filename
    })
  })

  describe('#read', () => {
    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(
        fs,
        fs.readFile.name,
      ).mockResolvedValue('')
      
      const result = await _service.read()
      expect(result).toEqual([])      
    })

    it('should return users array without passwords', async () => {
      const dbData = [
        {"username":"thallesian-1","password":"pass1","createdAt": new Date().toISOString()},
        {"username":"thallesian-2","password":"pass2","createdAt": new Date().toISOString()},
        {"username":"thallesian-3","password":"pass3","createdAt": new Date().toISOString()},
        {"username":"thallesian-4","password":"pass4","createdAt": new Date().toISOString()},
        {"username":"thallesian-5","password":"pass5","createdAt": new Date().toISOString()},
      ]
      jest.spyOn(
        fsSync,
        fsSync.existsSync.name
        ).mockReturnValue(true)
      const fileContents = dbData.map(item => JSON.stringify(item).concat('\n')).join('')
      jest.spyOn(
        fs,
        "readFile",
      ).mockResolvedValue(fileContents)
      const result = await _service.read()
      const expected = dbData.map(({ password, ...rest }) => ({ ...rest }))
      expect(result).toEqual(expected)      
    })

    it('should return an empty array if the file is not exists', async () => {
      jest.spyOn(
        fsSync,
        "existsSync"
      ).mockReturnValue(false)

      const result = await _service.read()
      expect(result).toEqual([])      
    })
  })
})


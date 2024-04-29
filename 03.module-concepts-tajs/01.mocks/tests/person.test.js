import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person.js'

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw if the name is not present', () => {
      const mockInvalidPerson = {
        name: '',
        cpf: '489.502.368-00'
      }
      expect(() => Person.validate(mockInvalidPerson))
      .toThrow(new Error('Name is required'))
    })

    it('should throw if the cpf is not present', () => {
      const mockInvalidPerson = {
        name: 'Thalles Ian',
        cpf: ''
      }
      expect(() => Person.validate(mockInvalidPerson))
      .toThrow(new Error('CPF is required'))
    })

    it('should not throw if person is valid', () => {
      const mockInvalidPerson = {
        name: 'Thalles Ian',
        cpf: '489.502.368-00'
      }
      expect(() => Person.validate(mockInvalidPerson))
      .not
      .toThrow(new Error('CPF is required'))
    })
  })

  describe('#format', () => {
    it('should format person name and cpf', () => {
      const mockPerson = {
        name: 'Silva Thalles',
        cpf: '000.444.333-11'
      }
      const formatedPerson = Person.format(mockPerson)
      const expected = {
        name: 'Silva',
        cpf: '00044433311',
        lastName: 'Thalles'
      }
      expect(formatedPerson).toStrictEqual(expected)
    })
  })

  describe('#save', () => {
    it('should save a correctly person', () => {
      const mockPerson = {
        cpf: '11122233300',
        name: 'Thalles',
        lastName: 'da Silva'
      }
      const formatedPerson = Person.save(mockPerson)
      const expected = 'Registrado com sucesso!!'
      expect(formatedPerson).toStrictEqual(expected)
    })

    it('should throw error when person not have name', () => {
      const mockPerson = {
        cpf: '11122233300',
        name: '',
        lastName: 'da Silva'
      }
      expect(() => Person.save(mockPerson)).toThrow('Cannot save invalid person!')
    })

    it('should throw error when person not have cpf', () => {
      const mockPerson = {
        cpf: '',
        name: 'Thalles',
        lastName: 'da Silva'
      }
      expect(() => Person.save(mockPerson)).toThrow('Cannot save invalid person!')
    })
    it('should throw error when person not have last name', () => {
      const mockPerson = {
        cpf: '11122233300',
        name: 'Thalles',
        lastName: ''
      }
      expect(() => Person.save(mockPerson)).toThrow('Cannot save invalid person!')
    })
  })

  describe('#process', () => {
    it('should process a valid person', () => {
      // Arrange
      const mockPerson = {
        name: 'Thalles da Silva',
        cpf: '111.222.333-00'
      }

      jest.spyOn(
        Person,
        Person.validate.name,
      ).mockReturnValue()

      jest.spyOn(
        Person,
        Person.format.name,
      ).mockReturnValue({
        cpf: '11122233300',
        name: 'Thalles',
        lastName: 'da Silva'
      })
      // Act
      const result = Person.process(mockPerson)
      // Assert
      const expected = 'ok'
      expect(result).toStrictEqual(expected)

    })
  })
})
class Person {
  static validate(person) {
    if(!person.name) throw new Error('Name is required')
    if(!person.cpf) throw new Error('CPF is required')
  }

  static format(person) {
    const [name, ...lastName] = person.name.split(' ')
    return {
      cpf: person.cpf.replace(/\D/g, ''),
      name,
      lastName: lastName.join(' ')
    }
  }

  static save(person) {
    if(!['cpf', 'name', 'lastName'].every(prop => person[prop])) {
      throw new Error(`Cannot save invalid person!`)
    }

    return 'Registrado com sucesso!!'
  }

  static process(person) {
    this.validate(person)
    const personFormated = this.format(person)
    this.save(personFormated)
    return 'ok'
  }
}

Person.process({ name: 'Thalles Ian', cpf: '489.502.368-00' })

export default Person
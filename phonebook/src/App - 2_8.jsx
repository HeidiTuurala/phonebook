import { useState } from 'react'

const Person = (props) => {
  console.log(props)

  return (
    <li>
      {props.person.name} {props.person.number}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+38-442-5598'}
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    const nameAdded = persons.some(person => person.name === newName)

    if (nameAdded) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    console.log('button clicked', event.target)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: 
          <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          Number:
          <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person}/>
          )}
      </ul>
    </div>
  )

}

export default App


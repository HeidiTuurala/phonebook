import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
  console.log(props)

  return (
    <li>
      {props.person.name} {props.person.number}
    </li>
  )
}

const AllPersons = ({persons}) => {
  return (
    <ul>
    {persons.map(person =>
      <Person key={person.name} person={person}/>
      )}
    </ul>
  )
}

const AddPerson = ({addName, newName, handleNameChange, handleNumberChange, newNumber}) => {

  return (
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Add a new</h3>
      <AddPerson 
       addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} 
      newNumber={newNumber}/>

      <h3>Numbers</h3>
      <AllPersons persons={persons}/>

    </div>
  )

}

export default App


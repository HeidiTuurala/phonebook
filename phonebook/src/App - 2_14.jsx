import { useState, useEffect } from 'react'
import personService from './services/persons'


const Person = ({ person, eliminate }) => {
  return (
    <li>
      {person.name} {person.number} {" "}
      <button onClick={() => eliminate(person)}>delete</button>
    </li>
  )
}

const AllPersons = ({ persons, eliminate }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.name} person={person} eliminate={eliminate} />
      )}
    </ul>
  )
}

const AddPerson = ({ addName, newName, handleNameChange, handleNumberChange, newNumber }) => {

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
          onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+38-442-5598' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameAdded = persons.some(person => person.name === newName)

    if (nameAdded) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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

  const eliminate = ({id, name}) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .eliminate(id)
        .then(response => {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Add a new</h3>
      <AddPerson
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber} />

      <h3>Numbers</h3>
      <AllPersons
        persons={persons}
        eliminate={eliminate}
      />
    </div>
  )

}

export default App


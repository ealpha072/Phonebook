import {useState} from 'react'
import Hearder from './components/Header'



const App = () => {
    const [contacts, setContacts] = useState([
        {id:1 ,name: 'Alpha', number:'0798975799'},
        {id:2, name: 'Arto Hellas', number: '040-123456' },
        {id:3, name: 'Ada Lovelace', number: '39-44-5323523'},
        {id:4, name: 'Dan Abramov', number: '12-43-234345'},
        {id:5, name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])

    const [newName, setName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [searchValue, setSearchValue] = useState('')

    
    const handleNameChange = (event) => {
        event.preventDefault()
        setName(event.target.value)
    }

    const handleNumberChange = (e) => {
        e.preventDefault()
        setNumber(e.target.value)
    }

    const addContact = (e) => {
        e.preventDefault()
        const newContact = {
            name: newName,
            number:newNumber,
            id: Math.max(...contacts.map(contact=>contact.id)) + 1
        }

        setContacts(contacts.concat(newContact))
        setName('')
        setNumber('')
    }

    const handleSearchValue = (e) =>{

    }

    return (
        <>
            <Hearder />
            <Search 
                value = {searchValue}
                handleChange = {}
            />
            <Form  
                handleNameChange={handleNameChange} 
                addContact={addContact} nameValue={newName} 
                handleNumberChange={handleNumberChange} 
                numberValue={newNumber} 
            />

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => <Person key={contact.id} person={contact}/>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App
import {useState, useEffect} from 'react'
import Hearder from './components/Header'
import { getAll, create, deletePerson, update } from './services/contact'
import {Search, Form, Person} from './components/Body'

const App = () => {
    const [contacts, setContacts] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [newName, setName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [searchValue, setSearchValue] = useState('')

    useEffect(()=>{
        getAll().then(res => 
            setContacts(res.data)    
        )
    }, [])

    //handle input changes
    const handleNameChange = (event) => {
        event.preventDefault()
        setName(event.target.value)
    }

    const handleNumberChange = (e) => {
        e.preventDefault()
        setNumber(e.target.value)
    }

    const handleSearchValueChange = (e) =>{
        e.preventDefault()
        setSearchValue(e.target.value)
        setShowAll(false)   
    }

    //onform submit
    const addContact = (e) => {
        e.preventDefault()

        const newContact = {
            name: newName,
            number:newNumber,
            id: Math.max(...contacts.map(contact=>contact.id)) + 1
        }

        if(contacts.filter(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())){
            if(window.confirm(`User ${newContact.name} already exists. Replace old number with new ?`)){
                const person = contacts.find(n => n.name.toLowerCase() === newContact.name.toLowerCase())
                console.log(person)
                const updatedPerson = {...person, number:newContact.number}
                console.log(updatedPerson);
                update(person.id, updatedPerson).then(resp => {
                    setContacts(contacts.map(contact => contact.id !== person.id ? contact : resp.data))
                })
            }
        }else{
            create(newContact).then(resp => {
                setContacts(contacts.concat(resp.data))
                setName('')
                setNumber('')
            })
        }
    }

    //delete user
    const deleteUser = (id) =>{
        if(window.confirm('Are you sure you want to delete the user?')){
            deletePerson(id).then(resp => {
                alert(`User with id ${id} has been deleted successfully`)
            })
            setContacts(contacts.filter(contact => contact.id !== id))
        }
    }

    //update user

    const handleFormFocus = () =>{
        setShowAll(true)
        setSearchValue('')
    }

    const handleSearchFocus = () =>{
        setShowAll(false)
    }

    const toShow = showAll ? contacts : contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (
        <>
            <Hearder />
            <Search 
                handleSearchChange = {handleSearchValueChange}
                searchValue = {searchValue}
                handleFocus = {handleSearchFocus}
            />
            <Form  
                handleNameChange={handleNameChange} 
                addContact={addContact} 
                nameValue={newName} 
                handleNumberChange={handleNumberChange} 
                numberValue={newNumber} 
                handleFocus = {handleFormFocus}
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
                        {toShow.map(contact => <Person key={contact.id} person={contact} deleteUser ={()=>deleteUser(contact.id)} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App
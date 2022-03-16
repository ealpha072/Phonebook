import {useState, useEffect} from 'react'
import { getAll, create, deletePerson, update } from './services/contact'
import {Search, Form, Person, Notification} from './components/Body'

const App = () => {
    const [contacts, setContacts] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [newName, setName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [error, setError] = useState('')

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

        if(contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())){
            
            if(window.confirm(`User ${newContact.name} already exists. Replace old number with new ?`)){
                const person = contacts.find(n => n.name.toLowerCase() === newContact.name.toLowerCase())
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
            setError(`User ${newContact.name} added to contacts`)
            setTimeout(()=>{
                setError(null)
            }, 5000)
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
            <Search 
                handleSearchChange = {handleSearchValueChange}
                searchValue = {searchValue}
                handleFocus = {handleSearchFocus}
            />
            <Notification message={error} />
            <Form  
                handleNameChange={handleNameChange} 
                addContact={addContact} 
                nameValue={newName} 
                handleNumberChange={handleNumberChange} 
                numberValue={newNumber} 
                handleFocus = {handleFormFocus}
            />

            <div className="card">
                <div className='card-header'>
                    Contacts List
                </div>
                <div className='card-body'>
                    <table className={'table table-stripped table-dark mt-2'}>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {toShow.map(contact => <Person key={contact.id} person={contact} deleteUser ={()=>deleteUser(contact.id)} />)}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </>
    )
}

export default App
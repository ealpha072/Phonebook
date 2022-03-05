const Search = (props) => {
    return (
        <div>
            <form>
                <label>Search name: </label>
                <input placeholder="Search name" value={props.searchValue} onChange={props.handleSearchChange} onFocus={props.handleFocus}/>
            </form>
        </div>
    )
}

const Form = ({addContact, handleNameChange, handleNumberChange, nameValue, numberValue, handleFocus}) =>{
    return(
        <>
            <div className={"card"} >
                <div className={"card-body"}>
                    <form className={"form-inline"} onSubmit = {addContact} >
                        <div className={"form-group row"}>
                            <label className={"col-sm-3 col-form-label"}>Name</label>
                            <input type="text" className={"form-control form-control-sm col-sm-6"} placeholder="Enter new contact name" onChange = {handleNameChange} value={nameValue} onFocus={handleFocus} required/>

                            <label className={"col-sm-3 col-form-label"}>Number</label>
                            <input type="text" className={"form-control form-control-sm col-sm-6"} placeholder="Enter new contact number" onChange = {handleNumberChange} value={numberValue} required/>

                            <button type="submit" className={"btn btn-primary btn-sm ml-2"}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

const Person = ({person, deleteUser}) => {
    return (
        <tr>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={deleteUser}>Delete</button></td>
        </tr>
    )
}


export {Search, Form, Person}
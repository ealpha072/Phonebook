const Search = (props) => {
  return (
    <div>
      <form className="form-inline">
        <label>Search name: </label>
        <input
          placeholder="Search name"
          className={"form-control"}
          value={props.searchValue}
          onChange={props.handleSearchChange}
          onFocus={props.handleFocus}
        />
      </form>
    </div>
  );
};

const Form = ({
  addContact,
  handleNameChange,
  handleNumberChange,
  nameValue,
  numberValue,
  handleFocus,
}) => {
  return (
    <>
      <div className={"card"}>
        <div className={"card-body"}>
          <form className={""} onSubmit={addContact}>
            <div className={"form-row"}>
              <div className={"col-5"}>
                <label className={"col-form-label"}>Name</label>
                <input
                  type="text"
                  className={"form-control form-control-md"}
                  placeholder="Enter new contact name"
                  onChange={handleNameChange}
                  value={nameValue}
                  onFocus={handleFocus}
                  required
                />
              </div>
              <div className={"col-5"}>
                <label className={"col-form-label"}>Number</label>
                <input
                  type="text"
                  className={"form-control form-control-md"}
                  placeholder="Enter new contact number"
                  onChange={handleNumberChange}
                  value={numberValue}
                  required
                />                
              </div>
            </div>
            <button type="submit" className={"btn btn-primary btn-sm mt-2"}>
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const Person = ({ person, deleteUser }) => {
  return (
    <tr>
      <td>{person.id}</td>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={deleteUser} className={"btn btn-danger btn-sm"}>Delete</button>
      </td>
    </tr>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export { Search, Form, Person, Notification };

const Search = (props) => {
  return (
    <div>
      <form className="form-inline">
        <label>Search name: </label>
        <input
          placeholder="Search name"
          className={"form-control ml-3"}
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
      <div className="row">
        <div className={"col-lg-12 col-md-12 col-sm-12 col-sm-12"}>
          <form onSubmit={addContact}>
            <div className={"form-group row"}>
              <div className={"col d-flex"}>
                <label className={"col-form-label mr-2"}>Name: </label>
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
              <div className={"col d-flex"}>
                <label className={"col-form-label mr-2"}>Number:  </label>
                <input
                  type="text"
                  className={"form-control form-control-md"}
                  placeholder="Enter new contact number"
                  onChange={handleNumberChange}
                  value={numberValue}
                  required
                />                
              </div>
              <div className="col">
                <button type="submit" className={"btn btn-primary btn-sm mb-0"}>
                  + Add
                </button>
              </div>
            </div>
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

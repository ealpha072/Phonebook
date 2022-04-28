import React, {useState} from 'react'

const Form = () => {
  const [formData, setFormData] = useState({name:'', number:''})

  const handleInputChange = e => {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  
  return (
    <form action="">
      <div className="form-row">
        <div className="col-auto">
          <input 
            type="text" 
            name="name" 
            placeholder='Type in name' 
            className='form-control form-control-sm' 
            onChange = {handleInputChange}
          />
        </div>
        <div className="col-auto">
          <input 
            type="tel" 
            name="number" 
            id="" 
            placeholder='Telephone number' 
            className='form-control form-control-sm'
            onChange= {handleInputChange}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-secondary btn-sm">
            <i className="fa fa-plus"></i> Add
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
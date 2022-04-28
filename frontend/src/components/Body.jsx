import React, {useEffect} from 'react'
import Form from './Form'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { useSelector } from 'react-redux'
import { userSelector } from '../redux/reducers/userSlice'


const Body = () => {
  $('.root').removeClass('root')
  const navigate = useNavigate()

  useEffect(()=>{
   
  })

  return (
    <div className='container card'>
      <div className="card-header">
        <h4>PhoneBook</h4>
        <Link to='/'>Logout</Link>
      </div>
      <div className="card-body">
        <Form />
        <table className="table table-stripped table-dark">
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Phone</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Body
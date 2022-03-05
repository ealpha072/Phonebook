import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(url)
}

const create = contactObj =>{
    return axios.post(url, contactObj)
}

const deletePerson = id =>{
    return axios.delete(`${url}/${id}`, )
}

export {getAll, create, deletePerson}
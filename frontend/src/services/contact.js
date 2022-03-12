import axios from 'axios'
const url = '/contacts'

const getAll = () => {
    return axios.get(url)
}

const create = contactObj =>{
    return axios.post(url, contactObj)
}

const deletePerson = id =>{
    return axios.delete(`${url}/${id}`, )
}

const update = (id, updatedObj) => {
    return axios.put(`${url}/${id}`, updatedObj)
}

export {getAll, create, deletePerson, update}
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = (person) => {
    return axios.post(baseUrl, person).then(response => response.data)
}

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const deleteNumber = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {create, getAll, deleteNumber, update}
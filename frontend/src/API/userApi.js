import axios from "axios";

const baseUrl = 'http://localhost:5000/users'

export const signinUser = async (data) => {
  const request = await axios.post(`${baseUrl}/signin`, data)
  return request.data
}

export const signupUser = async (data) => {
  const request = await axios.post(`${baseUrl}/signup`, data)
  return request.data
}




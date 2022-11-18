import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const graphqlQuery = {
      query: `
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            _id
            name
          }
        }
      `,
      variables: {
        email: formData.email,
        password: formData.password,
       
      }
    }; 
    const { data } = await api.signIn(graphqlQuery);
    const result = {data:data.data.login}
    dispatch({ type: AUTH, data:result });

    navigate('/home');
  } catch (error) {
 
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const graphqlQuery = {
      query: `
      mutation Usersignup($email: String!, $password: String!, $name: String!, $phone: String!) {
          signup(userInput:{email: $email, password: $password, name: $name, phone: $phone}) {
            token
            _id
            name
          }
        }
      `,
      variables: {
        email: formData.email,
        password: formData.password,
        name:formData.name,
        phone:formData.phone
      }
    };
    const  {data}  = await api.signUp(graphqlQuery);
    console.log(data.data.signup);
    const result = {data:data.data.signup}
    dispatch({ type: AUTH, result });

    navigate('/home');
  } catch (error) {
    console.log(error.response.data.errors[0].message);
  }
};

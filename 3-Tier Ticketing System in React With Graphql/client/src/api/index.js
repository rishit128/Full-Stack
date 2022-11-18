import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URI });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).data.token}`;
    }
  
    return req;
  });

export const signIn = (formData) => API.post('/graphql', formData);

export const signUp = (formData) => API.post('/graphql', formData);

export const createTicket = (newTicket) => API.post('/tickets', newTicket);

export const fetchTickets = (graphqlQuery) => API.post('/graphql',graphqlQuery);

export const updateTicket = (graphqlQuery) => API.post(`/graphql`, graphqlQuery);

export const deleteTicket = (deleteTicket) =>API.post(`/tickets/delete`,deleteTicket);

export const fetchTicketsBySearch = (searchQuery) => API.get(`/tickets/search?searchQuery=${searchQuery.search || 'none'}`);

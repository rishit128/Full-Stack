import * as api from '../api/index.js';
import {FETCH_BY_SEARCH, CREATE,FETCH_ALL,UPDATE,DELETE} from '../constants/actionTypes';
export const Ticket_DETAILS_FRAGMENT = `
  fragment ticket on Ticket {
    _id
    ticket_desc
    empid
    empname
    Date
    Resolved
    createdAt
    updatedAt
    DeletedAt
  }
`;
export const createTicket = (ticket) => async (dispatch) => {
    try {
      const { data } = await api.createTicket(ticket);
      if(data.message==="Invalid Token")
      {
        localStorage.clear()
        window.location="/signin"
      }
      else{
        dispatch({ type: CREATE, payload: data });
      }
  
     
    } catch (error) {
   
    }
  };


  export const getTickets = () => async (dispatch) => {
    try {
      const graphqlQuery = {
        query: `
        query gettickets{
          fetchtickets{
           ...ticket
          }
        }
        ${Ticket_DETAILS_FRAGMENT}
      `
      }; 
      const { data } = await api.fetchTickets(graphqlQuery);
      console.log(data.data)
      if(data.message==="Invalid Token")
      {
        localStorage.clear()
        window.location="/signin"
      }
      else{
        dispatch({ type: FETCH_ALL, payload: data.data.fetchtickets });
      }
      
    } catch (error) {
      console.log(error.response);
    }
  };

  export const updateTicket = (id, ticket) => async (dispatch) => {
    try {
      console.log(id,ticket);
      const graphqlQuery = {
        query: `
        mutation updatetickets($id:ID!,$ticket_desc:String!,$empid:Int!){
          updatetickets(id:$id,ticket_desc:$ticket_desc,empid:$empid){
            ...ticket
          }
        }
        ${Ticket_DETAILS_FRAGMENT}
      `,
      variables:{
        id:id,
        ticket_desc:ticket.ticket_desc,
        empid:ticket.empid
      }
      }; 
      
      const { data } = await api.updateTicket(graphqlQuery);
      console.log(data)
      if(data.message==="Invalid Token")
      {
        localStorage.clear()
        window.location="/signin"
      }
      else{
        dispatch({ type: UPDATE, payload: data.data.updatetickets });
      }
      
    } catch (error) {
  
    }
  };

  export const deletedTicket = (ticket) => async (dispatch)=>{
    try{
 
      const {data} = await api.deleteTicket(ticket);

      if(data.message==="Invalid Token")
      {
        localStorage.clear()
        window.location="/signin"
      }
      else{
        dispatch({type:DELETE,payload: data})
      }
      
      
  
    }catch(error){

    }
  }

  export const getTicketsBySearch = (searchQuery) => async (dispatch) => {
    try {
      
     
      const {data} = await api.fetchTicketsBySearch(searchQuery);

      dispatch({ type: FETCH_BY_SEARCH, payload:  data  });
    
    } catch (error) {
  
    }
  };
import {buildSchema} from 'graphql'
 
const schema = buildSchema(`
input UserInputData {
  email: String!
  name: String!
  password: String!
  phone: String!
}
type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  token: String!
  
}
type Ticket{
  _id: ID
  ticket_desc: String!
  empid:Int
  empname:String!
  Date: String!
  Resolved: Boolean
  createdAt:String!
  updatedAt:String
  DeletedAt:String
}

type RootQuery {
  login(email: String!, password: String!): User!
  fetchtickets: [Ticket!]!
 
}

type RootMutation {
  signup(userInput: UserInputData): User!
  updatetickets(id:ID!,empid:Int!,ticket_desc:String!):Ticket!
 
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);


export default schema
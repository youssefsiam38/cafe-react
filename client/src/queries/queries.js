import { gql } from "apollo-boost"; // to make GraphQL queries

const getMenuItemsQuery = gql`
    query {
        menuItems{
            id
            name
            type
            price
            photoURL
        }
    }
`

// query for getting ONE book
const getMenuItemQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            type
            price
            description
            photoURL
        }
    }
`

// mutation($variable) << allows variables to be passed to the mutation
const addMenuItemMutation = gql`
  mutation($name: String!, $type: String!, $price: String!, $description: String!) {
    addBook(name: $name, type: $type, price: $price, description: $description){
      name
      id
    }
  }
`

export { getMenuItemsQuery, getMenuItemQuery, addMenuItemMutation };
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
        menuItem(id: $id){
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
    addMenuItem(name: $name, type: $type, price: $price, description: $description){
      name
      id
    }
  }
`

export { getMenuItemsQuery, getMenuItemQuery, addMenuItemMutation };
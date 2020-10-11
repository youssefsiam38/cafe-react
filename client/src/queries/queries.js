const { gql } = require('apollo-boost'); // to make GraphQL queries

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

// query for getting one menu item
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

const addMenuItemMutation = gql`
  mutation($name: String!, $type: String!, $price: String!, $description: String!, $photoURL: String!) {
    addMenuItem(name: $name, type: $type, price: $price, description: $description, photoURL: $photoURL){
      name
      id
    }
  }
`
const editMenuItemMutation = gql`
  mutation($id: ID!, $name: String!, $type: String!, $price: String!, $description: String!, $photoURL: String!) {
    editMenuItem(id: $id, name: $name, type: $type, price: $price, description: $description, photoURL: $photoURL){
      id
      name
      type
      price
      description
      photoURL
    }
  }
`
const deleteMenuItemMutation = gql`
  mutation($id: ID!) {
    deleteMenuItem(id: $id){
      id
    }
  }
`

export { getMenuItemsQuery, getMenuItemQuery, addMenuItemMutation, editMenuItemMutation, deleteMenuItemMutation };
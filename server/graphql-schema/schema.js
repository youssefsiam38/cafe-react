const graphql = require("graphql");
const MenuItem = require("../db/models/menuItem.js");


const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull 
} = graphql;

/*
  Three responsibilities of the schema right now.
  1. Define types
  2. Define relationsips between types.
  3. Define root queries
  4. Define a way to manipulate data (Mutations)
*/


// 1. Define a type
const MenuItemType = new GraphQLObjectType({
  name: "MenuItem",
  fields: () => ({
    id:     { type: GraphQLID },
    name:   { type: GraphQLString },
    type:  { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    photoURL: { type: GraphQLString }
  })
});

// 2. Define relationships between types.
// This is done by adding an authorId property to books,
// then adding an author property under fields() in BookType above.
// The author property uses a resolve function that passes in the
// parent array (books in this case) and the value of authorId,
// and then searches for the corresponding data in the authors array.

// To build a reciprocal relationship, a books property is added to Authortype.
// The books type is a GraphQLList since one author can have many books.
// The resolve function takes in the array books as the parent argument,
// and returns the books list with the authorId property 
// that matches the parent.id

// 3. Describing a way a user can initially get into the graph
// to grab data with root queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    menuItem: {
      type: MenuItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        console.log(args.id)
        // MenuItem.findByID(args.id).then((d) => {
        //     console.log(d)
        // });
        return MenuItem.findByID(args.id);
      }
    },
    menuItems: {
      type: new GraphQLList(MenuItemType),
      resolve(parent, args){ // not using any arguments in this case...
        // return books;
        // uising .find() with an empty object returns all data
        return MenuItem.findAll();
      }
    }
  }
});

// 4. Defining a way to manipulate data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMenuItem: {
      type: MenuItemType, // AuthorType because we're trying to add an author
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        type:  { type: new GraphQLNonNull(GraphQLString) },
        price:  { type: new GraphQLNonNull(GraphQLString) },
        description:  { type: new GraphQLNonNull(GraphQLString) },
        photoURL:  { type: new GraphQLNonNull(GraphQLString) }
        // we're not adding an id because MongoDB automatically
        // indexes data as it's entered into the database
      },
      resolve(parent, args) {
        // this Author is coming from the mongodb model
        let mi = new MenuItem(args.name, args.type, args.price, args.description, args.photoURL);
        // must return if we want to see data after
        // we make mutation query in a graphql GUI.
        // also, .save() is from mongoose
        return mi.save();
      }
    }
  }
});

// exporting queries users are allowed to use on the front end
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});


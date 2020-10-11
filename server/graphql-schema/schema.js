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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    menuItem: {
      type: MenuItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return MenuItem.findByID(args.id);
      }
    },
    menuItems: {
      type: new GraphQLList(MenuItemType),
      resolve(parent, args){ // not using any arguments in this case...
        return MenuItem.findAll();
      }
    }
  }
});


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMenuItem: {
      type: MenuItemType, 
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        type:  { type: new GraphQLNonNull(GraphQLString) },
        price:  { type: new GraphQLNonNull(GraphQLString) },
        description:  { type: new GraphQLNonNull(GraphQLString) },
        photoURL:  { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let mi = new MenuItem(args.name, args.type, args.price, args.description, args.photoURL);

        return mi.save();
      }
    },
    editMenuItem: {
      type: MenuItemType, 
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        type:  { type: new GraphQLNonNull(GraphQLString) },
        price:  { type: new GraphQLNonNull(GraphQLString) },
        description:  { type: new GraphQLNonNull(GraphQLString) },
        photoURL:  { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const mi = await MenuItem.edit(args.name, args.type, args.price, args.description, args.photoURL,args.id);

        console.log(mi);

        return mi;
      }
    },
    deleteMenuItem: {
      type: MenuItemType, 
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }  
      },
      async resolve(parent, args) {
        const mi = await MenuItem.delete(args.id);

        console.log(mi);

        return mi;
      }
    }
  }
});

// exporting queries users are allowed to use on the front end
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});


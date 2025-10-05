import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";


export const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slogan: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, _args, { loaders }) {
        return loaders.usersByCompanyLoader.load(parent.id.toString());
      },
    },
  }),
});


export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parent, _args, { loaders }) {
        if (!parent.companyId) return null;
        return loaders.companyLoader.load(parent.companyId.toString());
      },
    },
  }),
});


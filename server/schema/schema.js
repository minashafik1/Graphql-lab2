import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { UserType, CompanyType } from "./types.js";
import { User, Company } from "../database/models.js";

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_parentValue, args) {
        let user = await User.findById(args.id);
        if (!user) throw new GraphQLError(`Can't find the user with id (${args.id})`);
        return user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await User.find();
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      async resolve(_parentValue, args) {
        let company = await Company.findById(args.id);
        if (!company) throw new GraphQLError(`Can't find the company with id (${args.id})`);
        return company;
      },
    },
    companies: {
      type: new GraphQLList(CompanyType),
      async resolve() {
        return await Company.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(_, args) {
        const user = new User(args);
        return await user.save();
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(_, args) {
        const updatedUser = await User.findByIdAndUpdate(args.id, args, { new: true });
        if (!updatedUser) throw new GraphQLError(`User with id (${args.id}) not found`);
        return updatedUser;
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_, { id }) {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new GraphQLError(`User with id (${id}) not found`);
        return deletedUser;
      },
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString },
        slogan: { type: GraphQLString },
      },
      async resolve(_, args) {
        const company = new Company(args);
        return await company.save();
      },
    },
    updateCompany: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        slogan: { type: GraphQLString },
      },
      async resolve(_, args) {
        const updatedCompany = await Company.findByIdAndUpdate(args.id, args, { new: true });
        if (!updatedCompany) throw new GraphQLError(`Company with id (${args.id}) not found`);
        return updatedCompany;
      },
    },
    deleteCompany: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      async resolve(_, { id }) {
        const deletedCompany = await Company.findByIdAndDelete(id);
        if (!deletedCompany) throw new GraphQLError(`Company with id (${id}) not found`);
        return deletedCompany;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

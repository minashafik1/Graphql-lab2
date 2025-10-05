import React from "react";
import {  gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import CompanyList from "./components/CompanyList";
import AddCompanyForm from "./components/AddCompanyForm";
import AddUserForm from "./components/AddUserForm";


const GET_COMPANIES = gql`
  query {
    companies {
      id
      name
      slogan
      users {
        id
        firstName
        age
      }
    }
  }
`;

const ADD_COMPANY = gql`
  mutation($name: String!, $slogan: String!) {
    addCompany(name: $name, slogan: $slogan) {
      id
      name
      slogan
    }
  }
`;

const ADD_USER = gql`
  mutation($firstName: String!, $age: Int!, $companyId: ID!) {
    addUser(firstName: $firstName, age: $age, companyId: $companyId) {
      id
      firstName
      age
      company {
        name
      }
    }
  }
`;

export default function App() {
  const { loading, error, data, refetch } = useQuery(GET_COMPANIES);
  const [addCompany] = useMutation(ADD_COMPANY);
  const [addUser] = useMutation(ADD_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <CompanyList companies={data.companies} />
      <AddCompanyForm addCompany={addCompany} refetch={refetch} />
      <AddUserForm addUser={addUser} companies={data.companies} refetch={refetch} />
    </div>
  );
}

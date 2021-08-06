import React, { FC, useState } from "react";
import styled from "styled-components";
import MainLayout from "layouts/MainLayout";
import { wrapper } from "store";
import axios from "axios";
import useSWR from "swr";
import { FavoritesResponseData } from "interfaces/FavoritesResponseData";
import { axiosConfig, axiosFetcher } from "axios/server";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const token = req.cookies.accessToken;

      if (!token) {
        return {
          redirect: {
            destination: "/auth",
            permanent: false,
          },
        };
      }

      const companiesData = await axios.get(
        `${process.env.API}/companies?page=1&limit=12`,
        axiosConfig(token)
      );
      const companies = companiesData.data;
      return {
        props: {
          companies,
        },
      };
    }
);

interface ISearch {
  companies: any;
}

const Search: FC<ISearch> = ({ companies }) => {
  const [searchWord, setSearchWord] = useState("");
  const { data: companiesData } = useSWR<FavoritesResponseData>(
    `/companies?page=1&limit=12&q=${searchWord}`,
    axiosFetcher,
    { initialData: companies }
  );

  if (!companiesData) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout
      headTitle={"Search"}
      title={
        <>
          <SearchTitle>Search</SearchTitle>
          <SearchInput
            value={searchWord}
            onChange={(event) => {
              setSearchWord(event.target.value);
            }}
          />
        </>
      }
    >
      <Wrapper>
        {companiesData.items.map((el: any) => (
          <CompanyCard key={el.id}>
            <p>{el.name}</p>
            <p>{el.phone}</p>
            <p>{el.fax}</p>
          </CompanyCard>
        ))}
      </Wrapper>
    </MainLayout>
  );
};

export default Search;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CompanyCard = styled.div`
  width: 45%;
  min-height: 268px;
  background: rgb(255, 255, 255);
  border-radius: 6px;
  margin: 12px;
  padding: 26px 32px;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid silver;
  border-radius: 6px;
  background-color: rgb(241, 244, 245);
`;

const SearchTitle = styled.p`
  font-weight: 500;
  margin-right: 35px;
`;

import React, { FC, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import useSWR from "swr";

import MainLayout from "layouts/MainLayout";
import { wrapper } from "store/store";
import httpClient from "../../axios/server";
import { loginThunk } from "../../store/user/userSlice";

type ServerData = {
  items: Array<{
    id: string;
    zoomInfoId: null | string;
    name: string;
    logo: null | string;
  }>;
};

interface IDashboard {
  serverData: ServerData;
}

const fetcher = (url: string) => httpClient.get(url).then((res) => res.data);

const Dashboard: FC<IDashboard> = ({ serverData }) => {
  const [companiesLimit, setCompaniesLimit] = useState(10);
  const [companiesPage, setCompaniesPage] = useState(1);

  const { data } = useSWR<ServerData>(
    `companies/?page=${companiesPage}&limit=${companiesLimit}`,
    fetcher,
    {
      initialData: serverData,
    }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Wrapper>
        {data.items.map((el) => (
          <div key={el.id}>
            <p>{el.name}</p>
          </div>
        ))}
      </Wrapper>
    </>
  );
};

export default Dashboard;
//@ts-ignore
Dashboard.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const data = await axios.get(
        `https://accelerist.herokuapp.com/api/v1/companies?page=1&limit=10
      `,
        {
          headers: {
            Authorization: `Bearer ${req.cookies.accessToken}`,
          },
        }
      );

      const serverData = await data.data;
      return {
        props: {
          serverData,
        },
      };
    }
);

const Wrapper = styled.div``;

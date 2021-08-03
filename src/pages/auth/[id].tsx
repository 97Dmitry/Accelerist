import { FC } from "react";

import styled from "styled-components";
import useSWR from "swr";
import { wrapper } from "store/store";
import httpClient from "axios/server";

interface Ilable {
  serverData: any;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Lable: FC<Ilable> = ({ serverData }) => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/",
    fetcher,
    { initialData: serverData }
  );
  return (
    <>
      <Wrapper>
        {/*{data ? (*/}
        {/*  <div>*/}
        {/*    {data.map((e: any) => (*/}
        {/*      <div key={e.id}>*/}
        {/*        <p>{e.title}</p>*/}
        {/*        <p>{e.body}</p>*/}
        {/*        <hr />*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <div>loading...</div>*/}
        {/*)}*/}
      </Wrapper>
    </>
  );
};

export default Lable;

const Wrapper = styled.div``;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       const data = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
//       const serverData = await data.json();
//       return {
//         props: {
//           serverData,
//         },
//       };
//     }
// );

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const data = await httpClient.get(
        `https://accelerist.herokuapp.com/api/v1/companies?page=1&limit=10
  `,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlYjg5M2IwZS1jZTI4LTQzOTItYTgyNC00YTNmZjljMzZlNzkiLCJhdWQiOiJhdXRoIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjI3ODkxMDkyLCJleHAiOjE2MzA0ODMwOTJ9.p8lzvtDdpv_EgBFGs2pizbiZXxWpgYfAvtF8JqfrviA",
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

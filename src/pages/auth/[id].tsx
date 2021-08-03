import { FC } from "react";

import styled from "styled-components";
import useSWR from "swr";
import { wrapper } from "store/store";
import httpClient from "axios/server";
import axios from "axios";

type ServerData = {
  items: Array<{
    id: string;
    zoomInfoId: null | string;
    name: string;
    logo: null | string;
  }>;
};

interface Ilable {
  serverData: ServerData;
}

const fetcher = (url: string) => httpClient.get(url).then((res) => res.data);

const Lable: FC<Ilable> = ({ serverData }) => {
  const { data } = useSWR<ServerData>(`companies/?page=1&limit=100`, fetcher, {
    initialData: serverData,
  });

  return (
    <>
      <Wrapper>
        {data ? (
          <div>
            {data.items.map((el: any) => (
              <div key={el.id}>
                <p>{el.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>loading...</div>
        )}
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
      const data = await axios.get(
        `https://accelerist.herokuapp.com/api/v1/companies?page=1&limit=100
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

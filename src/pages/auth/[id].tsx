import { NextComponentType } from "next";
import styled from "styled-components";

import useSWR from "swr";

interface Ilable {
  postsposts: any;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Lable: NextComponentType<Ilable> = ({ postsposts }) => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts/",
    fetcher,
    { initialData: postsposts }
  );

  return (
    <>
      <Wrapper>
        {data ? (
          <div>
            {data.map((e) => (
              <div key={e.id}>
                <p>{e.title}</p>
                <p>{e.body}</p>
                <hr />
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

export const getServerSideProps = async () => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  const postsposts = await data.json();

  return {
    props: {
      postsposts,
    },
  };
};

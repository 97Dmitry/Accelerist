import React, { FC, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { fetcher } from "axios/server";
import useSWR from "swr";

import MainLayout from "layouts/MainLayout";
import { wrapper } from "store/store";
import dateParser from "utils/dateParser";
import { FavoritesResponseData } from "../../interfaces/FavoritesResponseData";
import EmptyHouse from "../../assets/svg/EmptyHouse";

type ServerData = {
  items: Array<{
    id: string;
    zoomInfoId: null | string;
    name: string;
    logo: null | string;
  }>;
};

interface IDashboard {
  user: any;
  favorites: FavoritesResponseData;
}

const Dashboard: FC<IDashboard> = ({ user, favorites }) => {
  const [companiesLimit, setCompaniesLimit] = useState(10);
  const [companiesPage, setCompaniesPage] = useState(1);

  const { data: favoritesClientData } = useSWR<FavoritesResponseData>(
    "https://accelerist.herokuapp.com/api/v1/companies/favorites?page=1&limit=6",
    fetcher,
    { initialData: favorites }
  );

  if (!favoritesClientData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ColumnArticle>
        <ColumnArticleTitle>Prospecting Sessions</ColumnArticleTitle>
        <ColumnArticleMore>see more</ColumnArticleMore>
      </ColumnArticle>
      <Cards>
        <Card>
          <CardTitle>
            <p>Accounting Services</p>
          </CardTitle>
          <Filters>
            <p>Filters</p>
            <div>
              <Filter>Gender: Both</Filter>
              <Filter>Accounting Services</Filter>
            </div>
          </Filters>
          <ProspectNumber>
            <p>№ of Prospects Available</p>
            <h4>5</h4>
          </ProspectNumber>
          <CardInfo>
            <CardUser>
              <UserIcon>NN</UserIcon>
              <CardUserName>
                <p>No name</p>
                <p>owner</p>
              </CardUserName>
            </CardUser>
            <CardLastActivity>
              <p>Last Activity</p>
              <p>{dateParser(user.loggedInAt)}</p>
            </CardLastActivity>
          </CardInfo>
        </Card>
        <Card>
          <CardTitle>
            <p>California</p>
          </CardTitle>
          <Filters>
            <p>Filters</p>
            <div>
              <Filter>Gender: Both</Filter>
              <Filter>California</Filter>
              <Filter>Advanced</Filter>
            </div>
          </Filters>
          <ProspectNumber>
            <p>№ of Prospects Available</p>
            <h4>495</h4>
          </ProspectNumber>
          <CardInfo>
            <CardUser>
              <UserIcon>NN</UserIcon>
              <CardUserName>
                <p>No name</p>
                <p>owner</p>
              </CardUserName>
            </CardUser>
            <CardLastActivity>
              <p>Last Activity</p>
              <p>{dateParser(user.loggedInAt)}</p>
            </CardLastActivity>
          </CardInfo>
        </Card>
      </Cards>
      <DownSideContent>
        <Favorites>
          <span>Favorites</span>
          <FavoritesList>
            {favoritesClientData.items.map((el) => {
              return (
                <FavoriteCard key={el.id}>
                  <FavoriteImgName bg={el.logo}>
                    <div>{el.logo ? el.logo : <EmptyHouse />}</div>
                    <CardUserNameLowText>
                      <p>{el.name}</p>
                      <p>{el.score}</p>
                    </CardUserNameLowText>
                  </FavoriteImgName>
                  <FavoriteCardCSRFocus>
                    <p>CSR Focus</p>
                    {el.crsFocus.length
                      ? el.crsFocus.map((el, id) => <span key={id}>{el}</span>)
                      : "No information"}
                  </FavoriteCardCSRFocus>
                </FavoriteCard>
              );
            })}
          </FavoritesList>
        </Favorites>
        <Reports>Adqdwq</Reports>
      </DownSideContent>
    </>
  );
};

export default Dashboard;
//@ts-ignore
Dashboard.getLayout = function getLayout(page) {
  return (
    <MainLayout headTitle={"DashBoard"} title={"Dashboard"}>
      {page}
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const token = req.cookies.accessToken;
      const userData = await axios.get(
        `https://accelerist.herokuapp.com/api/v1/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const favoritesData = await axios.get(
        `https://accelerist.herokuapp.com/api/v1/companies/favorites?page=1&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = await userData.data;
      const favorites = await favoritesData.data;
      return {
        props: {
          user,
          favorites,
        },
      };
    }
);

const ColumnArticle = styled.div`
  padding: 30px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColumnArticleTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
`;

const ColumnArticleMore = styled.a`
  color: blue;
  font-weight: 500;

  cursor: pointer;
`;

const Card = styled.div`
  width: 49%;
  padding: 24px;
  background: #fff;
  border-radius: 6px;
`;

const CardTitle = styled.div`
  border-bottom: 1px solid #e8e8e8;

  & > p {
    font-weight: 500;
    font-size: 16px;
    padding: 10px 0;
  }
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 30px;
`;

const Filters = styled.div`
  padding: 18px 0;
  & > p {
    font-size: 12px;
    color: darkgray;
  }
  & > div {
    display: flex;
    padding: 8px 6px;
  }
`;

const Filter = styled.div`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid aqua;
  margin-right: 6px;
  cursor: pointer;
`;

const ProspectNumber = styled.div`
  background: #f9f9f9;
  border-radius: 4px;
  height: 70px;

  padding: 8px 0;

  & > p {
    font-size: 12px;
    color: darkgray;
    text-align: center;
  }
  & > h4 {
    font-weight: 500;
    font-size: 24px;
    color: black;
    text-align: center;

    margin-top: 8px;
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const CardUser = styled.div`
  display: flex;
  align-items: center;
`;

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #437bfc;
  color: #fff;
  border-radius: 50%;
  width: 44px;
  height: 44px;
`;

const CardUserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
  margin-left: 12px;
  overflow: hidden;

  & p {
    text-overflow: ellipsis;
    white-space: nowrap;
    &:last-child {
      font-size: 12px;
      color: darkgray;
    }
  }
`;

const CardUserNameLowText = styled(CardUserName)`
  font-size: 12px;
  font-weight: 500;
`;

const CardLastActivity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;

  & p {
    &:first-child {
      color: darkgray;
      margin-bottom: 6px;
    }
  }
`;

const DownSideContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Favorites = styled.div`
  width: 49%;
`;

const FavoritesList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FavoriteCard = styled.div`
  width: 49%;

  min-height: 156px;
  background: rgb(255, 255, 255);
  border-radius: 6px;
  padding: 24px;
`;

interface FavoriteImgName {
  bg: string;
}
const FavoriteImgName = styled.div<FavoriteImgName>`
  display: flex;
  align-items: center;

  & div {
    &:first-child {
      display: flex;
      justify-content: center;
      align-items: center;

      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      height: 48px;
      width: 48px;
      border-radius: 6px;
      background: ${(props) => (props.bg ? `url(${props.bg})` : "")};
    }
  }
`;

const FavoriteCardCSRFocus = styled.div`
  margin-top: 12px;
  font-size: 14px;
  & p {
    &:first-child {
      color: darkgray;
      margin-bottom: 8px;
    }
  }
`;
const Reports = styled.div`
  width: 49%;
`;

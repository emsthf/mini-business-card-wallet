import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #a29bfe;
  /* background: linear-gradient(135deg, #a29bfe, 75%, rgb(0, 140, 255)); */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
  padding-bottom: 100px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
  border-radius: 20px;
  border-style: hidden;
  @media screen and (max-width: 480px) {
    table {
      font-size: 8px;
    }
  }
`;

const TH = styled.th`
  border: 1px solid;
  text-align: left;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 22px;
`;

const TR = styled.tr`
  cursor: pointer;
  height: 45px;
  &:nth-child(even) {
    background-color: rgb(154, 170, 192);
  }
  &:hover {
    background-color: #192a56;
  }
`;

const TD = styled.td`
  border: 1px solid;
  text-align: left;
  padding: 8px;
  vertical-align: middle; // 테이블 수직 중앙 정렬
`;

function CardList() {
  const [cardItem, setCardItem] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/getAll").then((Response) => {
      setCardItem(Response.data);
      console.log(Response.data);
    });
  }, []);

  // 디테일 페이지용 추가 옵션들
  const navigate = useNavigate();
  const onClicked = (id) => {
    navigate(`/detail/${id}`);
    console.log(id);
  };

  // const cardMatch = useMatch("/cardList/:cardId");
  // console.log("cardMatch : ", cardMatch);
  // const clickedCard =
  //   cardMatch?.params.cardId &&
  //   cardItem.find((card) => String(card.id) === cardMatch.params.cardId);
  // console.log("clickedCard", clickedCard);

  return (
    <Wrapper>
      <Container>
        <Table>
          <thead>
            <tr>
              <TH>Id</TH>
              <TH>Name</TH>
              <TH>Position</TH>
              <TH>Phone Number</TH>
              <TH>Email</TH>
            </tr>
          </thead>
          <tbody>
            {cardItem.map((item) => (
              <TR onClick={() => onClicked(item.id)}>
                <TD>{item.id}</TD>
                <TD>{item.name}</TD>
                <TD>{item.position}</TD>
                <TD>{item.phoneNumber}</TD>
                <TD>{item.email}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Container>
    </Wrapper>
  );
}

export default CardList;

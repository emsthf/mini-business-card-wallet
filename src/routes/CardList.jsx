import axios from "axios";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DetailCard from "./DetailCard";

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

const TR = styled(motion.tr)`
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

const IconBox = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 10px 0px 10px 0px;
  transition: all 300ms ease;
  &:hover {
    transform: rotate(-20deg) scale(1.1);
    color: #ff9f43;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const BigBox = styled(motion.div)`
  position: absolute;
  width: 38rem;
  height: 65vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const modalVariants = {
  entry: { opacity: 0, y: -50 },
  normal: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -50,
  },
};

function CardList() {
  const [cardItem, setCardItem] = useState([]);
  const [delCheck, setDelcheck] = useState(false);
  const [editCheck, setEditCheck] = useState(false);
  // 현재 화면 스크롤 읽기
  const { scrollY } = useViewportScroll();

  // 삭제 펑션
  const delClicked = (id) => {
    if (window.confirm("이 명함을 지우시겠습니까?")) {
      axios.delete(`http://localhost:8080/api/del/${id}`).then((Response) => {
        setDelcheck(!delCheck);
      });
    } else {
      window.alert("삭제를 취소했습니다.");
    }
  };

  // 디테일 모달용 추가 옵션들
  const navigate = useNavigate();
  const onClicked = (id) => {
    navigate(`/cardList/${id}`);
  };

  // 모달 배경 클릭시 이전 화면으로
  const onOverlayClick = () => {
    navigate("/cardList");
  };

  const cardMatch = useMatch("/cardList/:cardId");
  const clickedCard =
    cardMatch?.params.cardId &&
    cardItem.find((card) => String(card.id) === cardMatch.params.cardId);

  useEffect(() => {
    // 데이터 불러오기
    axios.get("http://localhost:8080/api/getAll").then((Response) => {
      setCardItem(Response.data);
    });

    // 데이터 삭제 후 리렌더링
  }, [delCheck, editCheck]);

  return (
    <>
      <Wrapper>
        <Container>
          <Table>
            <thead>
              <tr>
                <TH>Name</TH>
                <TH>Position</TH>
                <TH>Phone Number</TH>
                <TH>Email</TH>
                <TH style={{ textAlign: "center" }}>Delete</TH>
              </tr>
            </thead>
            <tbody>
              {cardItem.map((item) => (
                <TR key={item.id}>
                  <TD onClick={() => onClicked(item.id)} style={{ fontWeight: "bold" }}>
                    {item.name}
                  </TD>
                  <TD onClick={() => onClicked(item.id)}>{item.position}</TD>
                  <TD onClick={() => onClicked(item.id)}>{item.phoneNumber}</TD>
                  <TD onClick={() => onClicked(item.id)}>{item.email}</TD>
                  <TD
                    onClick={() => delClicked(item.id)}
                    style={{ textAlign: "center", padding: 0 }}
                  >
                    <IconBox>
                      <i className="fa-solid fa-trash-can" />
                    </IconBox>
                  </TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Container>
      </Wrapper>

      <AnimatePresence>
        {cardMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigBox
              variants={modalVariants}
              initial="entry"
              animate="normal"
              exit="exit"
              style={{ top: scrollY.get() + 100 }}
            >
              {clickedCard && (
                <>
                  <DetailCard
                    id={clickedCard.id}
                    position={clickedCard.position}
                    name={clickedCard.name}
                    phoneNumber={clickedCard.phoneNumber}
                    email={clickedCard.email}
                    editCheck={editCheck}
                    setEditCheck={setEditCheck}
                  />
                </>
              )}
            </BigBox>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default CardList;

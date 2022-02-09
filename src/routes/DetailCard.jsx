import React from "react";
import { useLocation, useMatch } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #a29bfe;
  /* background: linear-gradient(135deg, #a29bfe, 75%, rgb(0, 140, 255)); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #026a37;
  height: 300px;
  width: 500px;
  border-radius: 12px;
  box-shadow: 10px 8px 5px rgba(0, 0, 0, 0.5);
`;

const GridBox = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  /* grid-template-columns: 1fr 2fr; */
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url("https://d2v80xjmx68n4w.cloudfront.net/gigs/rate/SEwc11582696537.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TextBox = styled.div`
  transform-origin: right center;
  /* position: absolute; */
  right: 0px;
  padding: 5px 10px;
  /* padding-left: 40px; */
  color: white;
  font-size: 16px;
  background-color: transparent;
  /* border: 1px solid ${(props) => props.theme.white.lighter}; */
`;

function DetailCard() {
  return (
    <Wrapper>
      <Container>
        <GridBox>
          <ImgBox />
          <Box>
            <TextBox>CEO</TextBox>
            <TextBox>이재용</TextBox>
            <TextBox>010-9999-9999</TextBox>
            <TextBox>samsung@gmail.com</TextBox>
          </Box>
        </GridBox>
      </Container>
    </Wrapper>
  );
}

export default DetailCard;

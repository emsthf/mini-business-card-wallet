import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 99;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(motion.h1)`
  font-family: "Comforter", cursive;
  font-size: 60px;
  margin-right: 50px;
  text-shadow: 2px 2px 2px gray;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 70px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: { backgroundColor: "rgba(0, 0, 0, 0)" },
  scroll: { backgroundColor: "#030a4e" },
};

function Header() {
  // useMatch는 react router의 기능으로, 해당 router 안에 있는지 알려준다
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/cardList");
  const navAnimation = useAnimation();
  // useViewPortScroll은 제일 아래로부터 얼마나 멀리 있는지를 알려준다.
  // srcollX, scrollY는 픽셀이 단위고, srcollXProgress, srcollYProgress는 백분율로 나타낸다
  const { scrollY } = useViewportScroll();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={navVariants} initial="top" animate={navAnimation}>
      <Col>
        <Link to="/">
          <Title variants={logoVariants} animate="normal" whileHover="active">
            Business Card Wallet
          </Title>
        </Link>
        <Items>
          <Item>
            <Link to="/">Add Card {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/cardList">
              Card List {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

export default Header;

import axios from "axios";
import { useForm } from "react-hook-form";
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

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  @media screen and (max-width: 500px) {
    width: 400px;
    margin-top: 55px;
    height: 260px;
  }
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
  @media screen and (max-width: 500px) {
    padding-top: 20px;
  }
`;

const Input = styled.input`
  transform-origin: right center;
  /* position: absolute; */
  right: 0px;
  padding: 5px 10px;
  /* padding-left: 40px; */
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid #fff;
  width: 200px;
  @media screen and (max-width: 500px) {
    right: 50px;
    width: 170px;
  }
`;

const ErrorTxt = styled.span`
  height: 20px;
  font-size: 12px;
  margin-top: 5px;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 60px;
  width: 120px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 20px;
  transition: all 300ms ease;
  &:hover {
    background-color: #ff9f43;
  }
`;

function AddCard() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      phoneNumber: "010",
    },
  });
  const onValid = (data) => {
    setError("extraError", { message: "Sercer Offline." });
    setValue("position", "");
    setValue("name", "");
    setValue("phoneNumber", "");
    setValue("email", "");

    axios
      .post("/api/add", {
        position: data.position,
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
      })
      .then((Response) => {
        window.alert("????????? ?????????????????????.");
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Container>
          <GridBox>
            <ImgBox />
            <Box>
              <Input {...register("position")} placeholder="Position" />
              <ErrorTxt />
              <Input
                {...register("name", { required: "?????? ?????? ?????????." })}
                placeholder="Name"
              />
              <ErrorTxt style={{ color: "red" }}>{errors?.name?.message}</ErrorTxt>
              <Input
                {...register("phoneNumber", {
                  required: "?????? ?????? ?????????.",
                  minLength: { value: 10, message: "??????????????? ?????? ????????????." },
                  maxLength: { value: 13, message: "??????????????? ?????? ?????????." },
                  pattern: {
                    value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                    message: "???????????? ????????? ????????????.",
                  },
                })}
                placeholder="Phone Number"
              />
              <ErrorTxt style={{ color: "red" }}>{errors?.phoneNumber?.message}</ErrorTxt>
              <Input
                {...register("email", {
                  required: "?????? ?????? ?????????.",
                  pattern: {
                    value:
                      /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/,
                    message: "????????? ???????????????",
                  },
                })}
                placeholder="Email"
              />
              <ErrorTxt style={{ color: "red" }}>{errors?.email?.message}</ErrorTxt>
            </Box>
          </GridBox>
        </Container>
        <Btn>Add Card</Btn>
        {/* <ErrorTxt style={{ color: "red" }}>{errors?.extraError?.message}</ErrorTxt> */}
      </Form>
    </Wrapper>
  );
}

export default AddCard;

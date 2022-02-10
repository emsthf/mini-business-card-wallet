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
`;

const GridBox = styled.div`
  display: grid;
  height: 100%;
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

const Input = styled.input`
  transform-origin: right center;
  /* position: absolute; */
  right: 0px;
  padding: 5px 10px;
  /* padding-left: 40px; */
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
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
      .post("http://localhost:8080/api/add", {
        position: data.position,
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
      })
      .then((Response) => {
        window.alert("명함이 등록되었습니다.");
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
                {...register("name", { required: "필수 항목 입니다." })}
                placeholder="Name"
              />
              <ErrorTxt style={{ color: "red" }}>{errors?.name?.message}</ErrorTxt>
              <Input
                {...register("phoneNumber", {
                  required: "필수 항목 입니다.",
                  minLength: { value: 10, message: "전화번호가 너무 짧습니다." },
                  maxLength: { value: 13, message: "전화번호가 너무 깁니다." },
                  pattern: {
                    value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                    message: "전화번호 형식이 아닙니다.",
                  },
                })}
                placeholder="Phone Number"
              />
              <ErrorTxt style={{ color: "red" }}>{errors?.phoneNumber?.message}</ErrorTxt>
              <Input
                {...register("email", {
                  required: "필수 항목 입니다.",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
                    message: "@gmail.com 메일만 허용됩니다",
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

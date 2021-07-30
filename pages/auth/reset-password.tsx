import { NextComponentType } from "next";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

import AuthLayout from "layouts/AuthLayout";
import { Button, Input, Label } from "styles/generalStyles";

interface IResetPassword {}

type IInput = {
  email: string;
};

const ResetPassword: NextComponentType<IResetPassword> = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInput>();

  const onSubmit: SubmitHandler<IInput> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Wrapper>
        <Card>
          <FormTitle>Password Reset</FormTitle>
          <Text>
            Enter your email to receive instructions on how to reset your
            password.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>Email</Label>
            <Input {...register("email")} placeholder={"Email"} />
            <SubmitButton type={"submit"}>Reset</SubmitButton>
          </form>
        </Card>
      </Wrapper>
    </>
  );
};

export default ResetPassword;
//@ts-ignore
ResetPassword.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 80px;
`;

const Card = styled.div`
  height: fit-content;
  width: 450px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 8px;

  background: #fff;
`;

const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Text = styled.div`
  font-size: 16px;
  margin-top: 32px;
`;

const SubmitButton = styled(Button)`
  margin-top: 40px;
`;

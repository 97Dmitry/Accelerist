import React, { useState } from "react";
import { NextComponentType } from "next";
import Link from "next/link";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { authorization } from "store/user/userSlice";
import { selectorLoading } from "store/user/userSelector";

import AuthLayout from "layouts/AuthLayout";
import LinkedIn from "assets/svg/LinkedIn";

interface IAuth {}

type Inputs = {
  email: string;
  password: string;
};

const Auth: NextComponentType<IAuth> = ({}) => {
  const [state, setState] = useState<"login" | "registration">("login");
  const loading = useAppSelector(selectorLoading);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(authorization({ email: data.email, password: data.password }));
  };

  return (
    <Wrapper>
      <Card>
        <FormTitle>Welcome to Accelerist</FormTitle>
        <ChangeStateButtonWrapper>
          <LoginButton toggle={state} onClick={() => setState("login")}>
            Login
          </LoginButton>
          <RegistrationButton
            toggle={state}
            onClick={() => setState("registration")}
          >
            Registration
          </RegistrationButton>
        </ChangeStateButtonWrapper>
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>Email</Label>
            <Input {...register("email")} placeholder={"Email"} />
            <Label>Password</Label>
            <Input
              {...register("password", {
                required: true,
                maxLength: 10,
              })}
              placeholder={"Password"}
            />
            {errors.password && errors.email && <p>This field is required</p>}
            {state === "registration" ? (
              <TextCenter>
                <RegistrationPolicy>
                  I agree that by clicking <strong>“Registration”</strong> I
                  accept the Terms Of Service and Privacy Policy
                </RegistrationPolicy>
              </TextCenter>
            ) : (
              <>
                <UnderForm>
                  <UnderFormUnit>
                    <Checkbox type="checkbox" /> <span>Remember</span>
                  </UnderFormUnit>
                  <Link href={"/"}>Forget Password?</Link>
                </UnderForm>
              </>
            )}
            <Button loading={loading ? 1 : 0} disabled={loading} type="submit">
              Send
            </Button>
          </form>
        </FormWrapper>
        <Text>
          <p>or continue with</p>
        </Text>
        <LinkedIn height={24} width={24} />
      </Card>
    </Wrapper>
  );
};

export default Auth;
//@ts-ignore
Auth.getLayout = function getLayout(page) {
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
  width: 480px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 8px;

  background: #fff;
`;

const FormWrapper = styled.div`
  margin-bottom: 12px;
`;

const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const ChangeStateButtonWrapper = styled.div`
  display: flex;
  height: 40px;
  margin-top: 30px;

  border-radius: 4px;
  background: #f8f8f8;
`;

interface IToggle {
  toggle: "login" | "registration";
}
const LoginButton = styled.button<IToggle>`
  width: 50%;
  margin: ${(props) => (props.toggle === "login" ? "1px" : "0")};
  border-radius: ${(props) => (props.toggle === "login" ? "4px" : "0")};
  background: ${(props) => (props.toggle === "login" ? "#90ddfc" : "#F8F8F8")};
  color: ${(props) => (props.toggle === "login" ? "#222" : "#929292")};
`;
const RegistrationButton = styled.button<IToggle>`
  width: 50%;
  margin: ${(props) => (props.toggle === "registration" ? "1px" : "0")};
  border-radius: ${(props) => (props.toggle === "registration" ? "4px" : "0")};
  background: ${(props) =>
    props.toggle === "registration" ? "#90ddfc" : "#F8F8F8"};
  color: ${(props) => (props.toggle === "registration" ? "#222" : "#929292")};
`;

const Label = styled.label`
  display: inline-block;
  color: #737373;
  font-size: 12px;
  padding: 10px 0;
`;

const Input = styled.input`
  height: 46px;
  width: 100%;
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
`;

interface IButton {
  loading: number;
}
const Button = styled.button<IButton>`
  height: 46px;
  width: 100%;
  background: ${(props) => (props.loading ? "#145368" : "#2baee0")};
  color: ${(props) => (props.loading ? "#fff" : "#000")};
  border-radius: 6px;
`;

const TextCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #737373;
  font-size: 12px;
  text-align: center;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  margin-right: 15px;
`;

const UnderForm = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;

  margin-top: 10px;
  margin-bottom: 66px;
`;

const UnderFormUnit = styled.div`
  display: flex;
  align-items: center;
`;

const RegistrationPolicy = styled.div`
  width: 90%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 16px;
`;

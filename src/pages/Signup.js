import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config-firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config-firebase";
import { useNavigate } from "react-router-dom";

const bgUrl = "/assets/images/bg.png";
const temUrl = "/assets/images/tem.png";

const Signup = () => {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState();
  const onFinish = (values) => {
    console.log("Success:", values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => {
        await setDoc(doc(db, "user", values.email), {
          email: values.email,
          password: values.password,
        });
        navigate("/signin");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            console.log("1");
            setEmailState(`Email address ${values.email} already in use!`);
            break;
          case "auth/invalid-email":
            setEmailState(`Email address ${values.email} is invalid!`);
            break;
          case "auth/operation-not-allowed":
            setEmailState(`Error during sign up!`);
            break;
          case "auth/weak-password":
            setEmailState(
              "Password is not strong enough. Add additional characters including special characters and numbers!"
            );
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        width: "100dvw",
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      <h1>SIGN UP</h1>

      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        style={{
          backgroundImage: `url(${temUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: 45,
          borderRadius: 30,
          paddingBottom: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <span style={{ color: "red" }}>{emailState}</span>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "green" }}
          >
            Sign Up
          </Button>
          Already have an account? <a href="./Signin">Sign in now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Signup;

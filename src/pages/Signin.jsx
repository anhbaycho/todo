import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config-firebase";
import { useNavigate } from "react-router-dom";

const bgUrl = "/assets/images/bg.png";
const temUrl = "/assets/images/tem.png";

const Signin = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        // Signed in
        localStorage.setItem("email", values.email);
        // await setDoc(doc(db, "users", values.email), {
        //   email: values.email,
        //   password: values.password,
        // });
        // ...
        navigate("/");
      })
      .catch((error) => {});
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
      <h1>SIGN IN</h1>
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

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 7,
            span: 12,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "green" }}
          >
            Sign In
          </Button>
          No account? <a href="./Signup">Create one!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Signin;

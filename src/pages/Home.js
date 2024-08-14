import "./Home.css";
import { FormOutlined } from "@ant-design/icons";
import { PlusCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import React from "react";
import { DatePicker } from "antd";
import { Button, Form, Input } from "antd";
import ItemTodo from "../components/ItemTodo";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config-firebase";

function Home() {
  const emailLocal = localStorage.getItem("email");
  const [form] = Form.useForm();
  const [dataTodo, setDataTodo] = useState([]);
  const [dateTodo, setDateTodo] = useState();
  const [checkData, setCheckData] = useState(0  );

  const setDataToFirebase = async () => {
    await setDoc(doc(db, "user", emailLocal), { todoList: dataTodo });
  };

  const onChangeDateTodo = (date, dateString) => {
    setDateTodo(dateString);
  };
  const removeItem = (id) => {
    setDataTodo(dataTodo.filter((item) => item.id !== id));
  };

  const getDataFireStore = async () => {
    setDataTodo((await getDoc(doc(db, "user", emailLocal))).data().todoList);
  };
  // setCheckData(0);
  useEffect(() => {
    if (checkData === 0) {
      getDataFireStore();
      setCheckData(1);
    }
    else if (checkData === 1) {
      setDataToFirebase();
    }
  }, [dataTodo]);

  const onFinish = async (values) => {
    setDataTodo([
      ...dataTodo,
      {
        name: values.name,
        type: values.type,
        date: dateTodo,
        status: false,
        isEdit: true,
      },
    ]);
    form.resetFields();
  };

  useEffect(() => {
    if (checkData === 1) {
      setDataToFirebase();
    }
  }, [dataTodo]);

  const handleStatusTodolist = (currentItem) => {
    setDataTodo((previousTodoList) =>
      previousTodoList.map((preItem) =>
        preItem.name === currentItem.name
          ? { ...preItem, status: !preItem.status }
          : preItem
      )
    );
    setDataToFirebase();
  };

  return (
    <div className="App">
      <a className="App-logout" href="/Signin">
        Log out
      </a>
      <header className="App-header">
        <div className="App-todo">
          <div className="App-todo-head">
            <div className="App-todo-head1">
              <FormOutlined style={{ color: "black", margin: 0 }} />
              <h1
                style={{
                  fontSize: 24,
                  color: "orange",
                  fontWeight: 500,
                  margin: 7,
                  marginLeft: 15,
                }}
              >
                To-Do
              </h1>
            </div>
            <p style={{ fontWeight: 100 }}>Signed in as: {emailLocal}</p>
          </div>
          <Form form={form} layout="horizontial" onFinish={onFinish}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input name!",
                  },
                ]}
                style={{ width: "70%" }}
                labelCol={{ style: { width: 60 } }}
                labelAlign="left"
              >
                <Input
                  type="text"
                  placeholder="Name?"
                  style={{
                    borderRadius: 20,
                    height: 30,
                  }}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Item
                label="Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please input type!",
                  },
                ]}
                style={{ width: "70%" }}
                labelCol={{ style: { width: 60 } }}
                labelAlign="left"
              >
                <Input
                  type="text"
                  placeholder="Type?"
                  style={{
                    borderRadius: 20,
                    height: 30,
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 20,
                paddingLeft: 30,
              }}
            >
              <Form.Item
                label="Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please input date!",
                  },
                ]}
                style={{ width: "70%" }}
                labelCol={{ style: { width: 60 } }}
                labelAlign="left"
              >
                <DatePicker
                  style={{ borderRadius: 20, width: "100%" }}
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                  onChange={onChangeDateTodo}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{ backgroundColor: "transparent", border: 0 }}
                  icon={
                    <PlusCircleFilled
                      style={{ fontSize: "33px", color: "green" }}
                    />
                  }
                ></Button>
              </Form.Item>
            </div>
          </Form>
          {dataTodo &&
            dataTodo?.map((item) => (
              <ItemTodo
                key={item.id}
                itemData={item}
                isEdit={item.isEdit}
                onChangeStatus={() => handleStatusTodolist(item)}
                removeItem={(id) => removeItem(id)}
              />
            ))}
        </div>
      </header>
    </div>
  );
}

export default Home;

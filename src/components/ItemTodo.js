import React, { useState } from "react";
import { Button, Switch } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { EditFilled } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const ItemTodo = (props) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(props.itemData.isEdit);
  const [targetValue, setTargetValue] = useState(props.itemData.name);
  const onChange = (item) => {
    setTargetValue(item.target.value);
  };

  return (
    <div
      className="App-todo-list"
      style={
        props.itemData.status
          ? { backgroundColor: "green" }
          : { backgroundColor: "#fff" }
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <div style={{ width: "auto", display: "flex", gap: 7 }}>
          <h1
            style={{
              fontSize: 16,
              margin: 0,
              textDecoration: props.itemData.status ? "line-through" : "",
              display: isEdit ? "flex" : "none",
            }}
          >
            {targetValue}
          </h1>
          <Input
            placeholder={"Name"}
            style={{ display: isEdit ? "none" : "flex" }}
            defaultValue={props.itemData.name}
            onChange={onChange}
          />
          <Button
            icon={<EditFilled />}
            onClick={() => setIsEdit(!isEdit)}
          ></Button>
        </div>
        {/* <Button
          icon={
            props.itemData.status ? <CheckSquareOutlined /> : <BorderOutlined />
          }
          onClick={() => props.onChangeStatus()}
        /> */}

        <Switch
          checkedChildren="finished"
          unCheckedChildren="unfinished"
          // value={props.itemData.status}
          onChange={() => props.onChangeStatus()}
        />
      </div>
      <div
        className="time"
        onClick={() => navigate("/detail", { state: props.itemData })}
      >
        <div className="time1">
          <p
            style={{
              height: 20,
              fontSize: 12,
              backgroundColor: "rgb(138, 8, 8)",
              color: "yellow",
              border: "solid transparent 0px",
              borderRadius: 5,
              marinLeft: 10,
              textAlign: "center",
              padding: 2,
            }}
          >
            {props.itemData.date}
          </p>
          <p
            style={{
              height: 20,
              fontSize: 12,
              backgroundColor: "rgb(138, 8, 127)",
              color: "yellow",
              border: "solid transparent 0px",
              borderRadius: 5,
              marginLeft: 10,
              textAlign: "center",
              padding: 2,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {props.itemData.type}
          </p>
        </div>
        <Button
          icon={<CloseCircleFilled style={{ color: "grey" }} />}
          onClick={() => props.removeItem(props.id)}
        ></Button>
      </div>
    </div>
  );
};
export default ItemTodo;

import "./Home.css";
import { FormOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import React from "react";

function Details() {
  const location = useLocation();
  const datatodo = location.state;
  return (
    <div className="App">
      <div className="App-todo-head">
        <FormOutlined style={{ color: "black" }} />
        <h1
          style={{
            fontSize: 24,
            color: "#2B1887",
            fontWeight: 500,
            marginLeft: 15,
          }}
        >
          To-Do
        </h1>
      </div>

      <h1>Name: {datatodo.name}</h1>
      <h1>Type: {datatodo.type}</h1>
      <h1>Date: {datatodo.date}</h1>
      <h1>Status: {datatodo.finishStatus?"finished":"unfinished"}</h1>
      <h1>IsEdit: {datatodo.isEdit?"edited":"unedited"}</h1>
        
    </div>
  );
}

export default Details;

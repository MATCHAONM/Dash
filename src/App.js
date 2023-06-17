import React, { useState } from "react";
import { Input, Button, Tag, message, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./style.css";
function App() {
  const [list, setList] = useState([
    { name: "ProjectA", users: 4, dashboards: 3, category: "D" },
    { name: "ProjectB", users: 2, dashboards: 4, category: "C" },
    { name: "ProjectC", users: 1, dashboards: 2, category: "F" },
    { name: "ProjectD", users: 3, dashboards: 2, category: "D" },
  ]);
  //输入名称搜索事件
  const handleChange = (evt) => {
    //输入框值为空时还原list
    if (!evt.target.value) {
      setList([
        { name: "ProjectA", users: 4, dashboards: 3, category: "D" },
        { name: "ProjectB", users: 2, dashboards: 4, category: "C" },
        { name: "ProjectC", users: 1, dashboards: 2, category: "F" },
        { name: "ProjectD", users: 3, dashboards: 2, category: "D" },
      ]);
    } else {
      //有值时过滤搜索条件
      const newList = list.filter((item) =>
        item.name.includes(evt.target.value)
      );
      setList([...newList]);
    }
  };
  //删除确认事件
  const handleConfirm = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    message.success("Deletion is done");
  };
  //取消删除
  const handleCancel = () => {
    message.error("Cancel");
  };
  return (
    <div className="container">
      <div className="input-container">
        <Input
          className="input-box"
          size="large"
          placeholder="Search for a keyword"
          prefix={<SearchOutlined />}
          onChange={handleChange}
        />
      </div>
      <div className="list-container">
        {list.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                borderLeft: `5px solid ${
                  item.category === "C"
                    ? "green"
                    : item.category === "D"
                    ? "blue"
                    : "purple"
                }`,
              }}
              className="list-item"
            >
              <div>
                {/* 根据类别不同,使用不同颜色标签组件 */}
                {item.category === "C" && (
                  <Tag color="green">{item.category}</Tag>
                )}
                {item.category === "D" && (
                  <Tag color="blue">{item.category}</Tag>
                )}
                {item.category === "F" && (
                  <Tag color="purple">{item.category}</Tag>
                )}
              </div>
              <div className="name">{item.name}</div>
              <div className="users">{item.users + "users"}</div>
              <Tag color="green">{item.dashboards + "dashboards"}</Tag>
              <Popconfirm
                title="Attention"
                description="Are you sure you want to delete this project?"
                onConfirm={() => handleConfirm(index)}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="Cancel"
              >
                <Button className="del-btn" type="text" danger>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

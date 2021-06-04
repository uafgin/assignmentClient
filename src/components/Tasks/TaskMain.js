import React from "react";
import TaskInsert from "./TaskInsert";
import TaskShow from "./TaskShow";
import "./TaskMain.scss";

class TaskMain extends React.Component {
  render() {
    return (
      <div className="TaskContainer">
        <TaskInsert />
        <TaskShow />
      </div>
    );
  }
}

export default TaskMain;

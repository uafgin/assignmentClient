import React from "react";
import { connect } from "react-redux";
import { reset } from "redux-form";
import { getTasks } from "../../actions";
import "./TaskShow.scss";

class TaskShow extends React.Component {
  componentDidMount() {
    this.props.getTasks();
  }
  renderImages = () => {
    const { tasks } = this.props;
    return tasks.map((task) => (
      <div key={task.id} className="row">
        <div className="three wide column">
          <div key={task.id} className="ui small image ">
            <img alt={task.Text} src={task.Picture} />
          </div>
        </div>

        <div className="thirteen wide column">
          <p>{task.Text}</p>
        </div>
      </div>
    ));
  };

  onLoadAll = () => {
    this.props.getTasks();
  };

  render() {
    return (
      <div className="showContainer">
        <h3 className="taskHeader">
          <i className="tasks icon"></i> Tasks
        </h3>
        {this.props.tasks.length ? (
          <div className="ui celled grid scrollContainer">
            {this.renderImages()}
          </div>
        ) : (
          <div>no tasks found</div>
        )}
        <div className="buttonContainer">
          <button onClick={this.onLoadAll} className="ui button primary">
            Load All
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: Object.values(state.tasks),
  };
};

export default connect(mapStateToProps, { getTasks })(TaskShow);

import React from "react";
import { connect } from "react-redux";
import { Divider, RaisedButton } from "material-ui";

import TaskForm from "src/views/components/task-form";
import { taskActions } from "src/tasks/actions";

class Tasks extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Divider />
        {this.props.tasks.valueSeq().map(task => (
          <div key={task.id}>
            <TaskForm
              onSubmit={this.props.saveTask}
              form={`task-form.${task.id}`}
              initialValues={task}
            />
            <Divider />
          </div>
        ))}
        <RaisedButton type="button" onClick={this.props.addTask}>
          Add
        </RaisedButton>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

function mapDispatchToProps(dispatch) {
  return {
    saveTask: task => dispatch(taskActions.modify(task)),
    addTask: () => dispatch(taskActions.add())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

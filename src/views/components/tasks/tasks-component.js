import React from "react";
import { connect } from "react-redux";

import TaskForm from "src/views/components/task-form";
import { taskActions } from "src/tasks/actions";

class Tasks extends React.Component {
  render() {
    return (
      <div>
        {this.props.tasks.valueSeq().map(task => (
          <div key={task.id}>
            {/*<span>{task.id} : {task.label}</span>*/}
            <TaskForm
              onSubmit={this.props.saveTask}
              form={`task-form.${task.id}`}
              initialValues={task}
            />
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

function mapDispatchToProps(dispatch) {
  return {
    saveTask: task => dispatch(taskActions.modify(task))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

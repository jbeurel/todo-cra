import React from "react";
import { connect } from "react-redux";
import { Divider } from 'material-ui';

import TaskForm from "src/views/components/task-form";
import { taskActions } from "src/tasks/actions";

class Tasks extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Divider />
        {this.props.tasks.valueSeq().map(task => (
          <React.Fragment>
            <div key={task.id}>
              <TaskForm
                onSubmit={this.props.saveTask}
                form={`task-form.${task.id}`}
                initialValues={task}
              />
            </div>
            <Divider/>
          </React.Fragment>
        ))}
      </React.Fragment>
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

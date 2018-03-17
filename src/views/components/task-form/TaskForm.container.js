import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import TaskForm from "./TaskForm.component";
import { taskActions } from "src/redux/entities/tasks/tasks.actions";

function mapDispatchToProps(dispatch) {
  return {
    remove: task => dispatch(taskActions.remove(task))
  };
}

export default connect(undefined, mapDispatchToProps)(reduxForm()(TaskForm));

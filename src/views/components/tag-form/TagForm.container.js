import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import TagForm from "./TagForm.component";
import { tagActions } from "../../../redux/entities/tags/tags.actions";

function mapDispatchToProps(dispatch) {
  return {
    remove: tag => dispatch(tagActions.remove(tag))
  };
}

export default connect(undefined, mapDispatchToProps)(reduxForm()(TagForm));

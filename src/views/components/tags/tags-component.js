import React from "react";
import { connect } from "react-redux";
import { Divider } from "material-ui";

import TagForm from "src/views/components/tag-form";
import { tagActions } from "src/redux/entities/tags/tags.actions";

class Tags extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Divider />
        {this.props.tags.valueSeq().map(tag => (
          <div key={tag.id}>
            {/*<span>*/}
            {/*{tag.id} : {tag.title} | {tag.body}*/}
            {/*</span>*/}
            <TagForm
              onSubmit={this.props.saveTag}
              form={`tag-form.${tag.id}`}
              initialValues={tag}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { tags: state.tags };
}

function mapDispatchToProps(dispatch) {
  return {
    saveTag: tag => dispatch(tagActions.modify(tag))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);

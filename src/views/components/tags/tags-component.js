import React from 'react';
import {connect} from 'react-redux'

import TagForm from 'src/views/components/tag-form'
import {tagActions} from "src/tags/actions";


class Tags extends React.Component {

  render() {
    return (
      <div>
        {this.props.tags.valueSeq().map((tag) =>
          <div key={tag.id}>
            <span>{tag.id} : {tag.title} | {tag.body}</span>
            <TagForm onSubmit={this.props.saveTag} form={`tag-form.${tag.id}`} initialValues={tag}/>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { tags: state.tags }
}

function mapDispatchToProps(dispatch) {
  return {
    saveTag: (tag) => dispatch({type: tagActions.TAG_MODIFY, tag}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)
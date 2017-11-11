import React from 'react';
import {connect} from 'react-redux'

import TagForm from 'src/views/components/tag-form'


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
    saveTag: (data) => dispatch({type: 'TAG_MODIFIED', tag: data}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)
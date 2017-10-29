import React from 'react';
import {connect} from 'react-redux'

import TagForm from 'src/views/components/tag-form'


class Tags extends React.Component {

  componentWillMount() {
    this.props.testAction();
  }

  render() {
    return (
      <div>
        {this.props.tags.valueSeq().map((tag) =>
          <div key={tag.id}>
            <span>{tag.id} : {tag.title} | {tag.body}</span>
            <TagForm form={`tag-form.${tag.id}`} initialValues={tag}/>
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
  return {testAction: () => dispatch({type: 'TEST_ACTION', payload: {coucou: 'coucou'}})}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)
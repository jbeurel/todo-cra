import React from 'react';
import {connect} from 'react-redux'

import TagForm from 'src/views/components/tag-form'


class Tags extends React.Component {

  componentWillMount() {
    this.props.testAction();
  }

  saveTag = (data) => {
    console.log('coucou data', data)
  };

  render() {
    return (
      <div>
        {this.props.tags.valueSeq().map((tag) =>
          <div key={tag.id}>
            <span>{tag.id} : {tag.title} | {tag.body}</span>
            <TagForm onSubmit={this.saveTag} form={`tag-form.${tag.id}`} initialValues={tag}/>
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
  return {saveTag: () => dispatch({type: 'TAG_SAVE', payload: {coucou: 'coucou'}})}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)
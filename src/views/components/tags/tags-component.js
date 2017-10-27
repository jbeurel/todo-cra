import React from 'react';
import {connect} from 'react-redux'

class Tags extends React.Component {

  componentWillMount() {
    this.props.testAction();
  }

  render() {
    return (
      <ul>
        {this.props.tags.valueSeq().map((tag) =>
          <li key={tag.id}>{tag.title}</li>
        )}
      </ul>
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
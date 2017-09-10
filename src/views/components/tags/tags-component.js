import React from 'react';
import {connect} from 'react-redux'

class Tags extends React.Component {

  componentWillMount() {
    console.log('coucou componentWillMount');
    this.props.testAction();
  }

  render() {
    return (
      <ul>
        {this.props.tags.map((tag) =>
          <li>{tag.title}</li>
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
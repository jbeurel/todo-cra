import React from 'react';
import {connect} from 'react-redux'

class Tags extends React.Component {

  render() {
    return (
        <ul>
          <li>coucou</li>
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

export default connect(mapStateToProps)(Tags)
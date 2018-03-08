import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Grid, Row, Col } from "react-flexbox-grid";

import Tags from "src/views/components/tags/tags-component";
import Tasks from "src/views/components/tasks/tasks-component";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Best Todo App Ever!" />
          <Grid fluid>
            <Row>
              <Col xs={6}>
                <h1>Tags</h1>
                <Tags />
              </Col>
              <Col xs={6}>
                <h1>Tasks</h1>
                <Tasks />
              </Col>
            </Row>
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;

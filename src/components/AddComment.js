import React, { Component, PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class PlanContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }
  handleComment(event) {
    this.setState({
      comment: event.target.value
    });
  }

  commentSubmit() {
    console.log(this.state.comment);
  }

  render() {
    console.log(this.props.plan);
    return(
      <Card style={{marginLeft: 10, marginRight:10, marginBottom: 10}}>
        <div style={{marginLeft: 10, marginRight:10, marginBottom: 10}}>
          <TextField
            onChange={this.handleComment.bind(this)}
            placeholder="Add a comment"
            multiLine={true}
            fullWidth={true}
            rows={3} /><br />
          <FlatButton
            label="Submit"
            primary={true}
            disabled={this.state.comment.length < 1}
            onClick={this.commentSubmit.bind(this)} />
        </div>
      </Card>
    )
  }

}
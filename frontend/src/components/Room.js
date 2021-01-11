import React,{ Component } from 'react';
import { Grid, Button, Typography } from "@material-ui/core";

export default class Room extends Component{
    constructor(props){
        super(props);
        this.state = {
        votes_to_skip: 2,
        guest_can_pause: false,
        is_host: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    }

    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
          .then((response) => response.json())
          .then((data) =>  {
            if (!response.ok) {
            this.props.leaveRoomCallback();
            this.props.history.push("/");
          }
          return response.json();
        })
        .then((data) => {
          this.setState({
            votes_to_skip: data.votes_to_skip,
            guest_can_pause: data.guest_can_pause,
            is_host: data.is_host,
          });
        });
      }
    
    leaveButtonPressed(){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      fetch("/api/leave-room", requestOptions).then((_response) => {
        this.props.leaveRoomCallback();
        this.props.history.push("/");
      });
    }  

    render(){
        return (
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Votes: {this.state.votes_to_skip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Guest Can Pause: {this.state.guest_can_pause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            Host: {this.state.is_host.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={this.leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
      );
    }
}
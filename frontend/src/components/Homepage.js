import React, { Component } from 'react';
import RoomJoinpage from './RoomJoinpage';
import CreateRoompage from './CreateRooompage';
import Room from './Room'
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount() {
        fetch('/api/user-in-room').then((response) => response.json()).then((data) => {
            this.setState({
                roooomCode: data.code
            });
         });
    }
    renderHomepage() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House Party with Musico
          </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
            </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
            </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode() {
        this.setState({
          roomCode: null,
        });
      }

    render() {
        return <Router>
            <Switch>
                <Route exact path='/'
                render={() => {
                    return this.state.roomCode ? (
                      <Redirect to={`/room/${this.state.roomCode}`} />
                    ) : (
                      this.renderHomepage()
                    );
                  }}
                  />
                <Route path='/join' component={RoomJoinpage} />
                <Route path='/create' component={CreateRoompage} />
                <Route path='/room/:roomCode' 
                render={(props) => {
                    return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
                  }}
                  />
            </Switch>
        </Router>;
    }
}
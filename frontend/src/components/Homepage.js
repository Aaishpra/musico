import React,{ Component } from 'react';
import RoomJoinpage from './RoomJoinpage';
import CreateRoompage from './CreateRooompage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class Homepage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Router>
            <Switch>
                <Route  exact path = '/'><p>This is the Homepage</p></Route>
                <Route path ='/join' component={RoomJoinpage} />
                <Route path = '/create' component={CreateRoompage} />
            </Switch>
        </Router>;
    }
}
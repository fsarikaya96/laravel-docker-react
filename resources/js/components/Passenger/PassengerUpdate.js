import React, {Component} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

class PassengerUpdate extends Component {


    componentDidMount () {
        const { id } = this.props.match.params
        console.log(id);//12345
    }


    render() {
        return (
            <div className="container py-3">

            </div>
        );
    }
}

export default withRouter(PassengerUpdate);

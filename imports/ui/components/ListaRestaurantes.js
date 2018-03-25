import React, {Component} from "react";
import { withTracker } from "meteor/react-meteor-data";
import {Restaurantes} from "../../api/restaurantes";

export class ListaRestaruantes extends Component{

    render(){
        console.log(this.props.restaurantes);
        return(
            <div className="container">
                <div className="row">
                    <p> asasasassa</p>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        restaurantes: Restaurantes.find({}).fetch()
    };
})(ListaRestaruantes);
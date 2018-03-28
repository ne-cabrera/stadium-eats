import React, {Component} from "react";

export class MenuItem extends Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        var item = {}
        item.plateName = this.props.plateName;
        item.price = this.props.price;
        this.props.onClick(item);
    }

    render(){
        return(
            <div className="row menuItem">
                <div className="col-md-6">
                    <p className="plateName">{this.props.plateName}</p>
                    <p className="ingredients">{this.props.ingredients}</p>
                </div>
                <div className="col-md-6">
                    <p>${this.props.price}</p>
                    <button className="btn btn-success" onClick={this.handleClick}>Add!</button>
                    
                </div>
            </div>
        )
    }
}
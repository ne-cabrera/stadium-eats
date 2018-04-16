import React, {Component} from "react";

export class PagIt extends Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.sel(this.props.num);
    }

    render(){
        return(
            <li className="page-item" onClick={this.handleClick}><a class="page-link">{this.props.num}</a></li>
        )
    }
}
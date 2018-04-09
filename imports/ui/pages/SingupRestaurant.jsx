import React from "react";
import { withHistory, Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Restaurantes } from "../../api/restaurantes";

export default class SingupRestaurant extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      stadium: "",
      img: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  picture(e) {
    e.preventDefault();
    let files = e.target.files;
    this.setState({
      img: files
    });
    console.log(files);
    console.log(this.state);

  }

  backHome(e) {
    e.preventDefault();
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      } else {
        this.props.history.push("/");
      }
    });
    this.props.history.push("/");

  }
  onChange(e) {
    e.preventDefault();
    this.setState({
      stadium: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    let phone = document.getElementById("signup-phone").value;
    let confPassword = document.getElementById("signup-confirm-password").value;
    let img = document.getElementById("signup-img").value;

    console.log(name, email, password, phone);
    if(password !== confPassword) {
      this.setState({
        error: "Passwords don't match"
      });
      document.getElementById("signup-password").value = "";
      document.getElementById("signup-confirm-password").value = "";
    } else {
      Accounts.createUser({
        username: name,
        email: email,
        password: password,
        profile: {
          phone: phone,
          role: "restaurant"
        }
      }, (err) => {
        if(err) {
          this.setState({
            error: err.reason
          });
        } else {
          this.props.history.push("/login");
        }
      });
      Meteor.call("restaurantes.insert", name, this.state.stadium);
      if(this.state.img[0] && this.state.img) {
        let FR = new FileReader();
        FR.onload = (data) => {
          console.log(data.target.result);
          Meteor.call("restaurantes.uploadPic", data.target.result);
        }
        FR.readAsDataURL(this.state.img[0]);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">Stadium Eats</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.backHome.bind(this)}>Home</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="padUp">
            <h1>
              Register
                        </h1>
          </div>
          <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" className="profile-name-card"></p>
            <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" id="signup-name" className="form-control input-lg" placeholder="Restaurant Name" />
              </div>
              <div className="form-group">
                <input type="email" id="signup-email" className="form-control input-lg" placeholder="Email adress" />
              </div>
              <div className="form-group">
                <input type="number" id="signup-phone" className="form-control input-lg" placeholder="Phone number" />
              </div>
              <div className="form-group">
                <input type="file" refs="photo" id="signup-img" className="form-control input-lg" onChange={this.picture.bind(this)} placeholder="Url of your Picture" />
              </div>
              <div className="form-group">
                <input type="password" id="signup-password" className="form-control input-lg" placeholder="Password" />
              </div>
              <div className="form-group">
                <input type="password" id="signup-confirm-password" className="form-control input-lg" placeholder="Confirm Password" />
              </div>

              <div className="form-group text-center">
                <select className="custom-select wid" onChange={this.onChange.bind(this)}>
                  <option value="Campin">Nemesio Camacho el Campin</option>
                  <option value="Techo">Estadio Metropolitano de Techo</option>
                  <option value="Caneca">La Caneca</option>
                </select>
              </div>

              <div className="form-group text-center">
                <input type="submit" id="login-button" className="btn btn-dark btn-lg btn-block" value="Register" />
              </div>
              <div className="form-group text-center">
                <p className="text-center">Do you have an account? Log in <Link to="/login">here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
import React,{ Component } from 'react';
var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyBquCWGtYDhWYm042UVjv3pvvpfDDqS4QA",
    authDomain: "fir-login-a0d30.firebaseapp.com",
    databaseURL: "https://fir-login-a0d30.firebaseio.com",
    projectId: "fir-login-a0d30",
    storageBucket: "fir-login-a0d30.appspot.com",
    messagingSenderId: "161542325537",
    appId: "1:161542325537:web:86927d899fe168e0432a60",
    measurementId: "G-EEZ8TGZCP6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

class Authenticate extends Component {

    signup(){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email,password);
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email,password);

        promise
        .then(signup => {
            var err = "Successfully SignedUp, "+signup.user.email;
            console.log("User data :",signup.user.email);
            console.log("User data :",signup.user.uid);
            firebase.database().ref('users/'+signup.user.uid).set({
                email : signup.user.email
            });
            this.setState({
                err : err,
                loggedin : true
            });
        })
        .catch(e =>{
            var err = e.message;
            this.setState({err : err});
            console.log("error data is :",err);
        });
    }

    login(){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        console.log(email,password);
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);

        promise
        .then(login =>{
            var err = "Successfully logged in, "+login.user.email;
            console.log("User data :",login.user.email);
            console.log("User data :",login.user.uid);
            firebase.database().ref('users/'+login.user.uid).set({
                email : login.user.email
            });
            this.setState({
                err : err,
                loggedin : true
            });
        })
        
        .catch(err =>{
            var error = err.message;
            console.log(error);
            this.setState({err : error});
        });
    }
     
    google(){
        console.log("i am in google ");
        var provider = new firebase.auth.GoogleAuthProvider();
        var promise = firebase.auth().signInWithPopup(provider);

        promise
          .then(result => {
              var user = result.user;
              console.log("result object is :",result);
              console.log("user object is :",user);
              firebase.database().ref('users/'+user.uid).set({
                  email : user.email,
                  name : user.displayName
              });
              this.setState({
                err : user.displayName+" , Logged in Successfully using Google",
                loggedin : true
            })
          })
          .catch(e=>{
              var err = e.message;
              var code = e.code;
              console.log("Error is:"+err+". Error code is :"+code);
              this.setState({
                  err : err,
                  loggedin : false
              })
          })
    }

    constructor(props){
    super(props);
    this.state = {
        err : "",
        loggedin : false
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
    }

    logout(){
        firebase.auth().signOut();
        this.setState({
            err : "",
            loggedin : false
        });
    }
render(){
    var hide ;
    var show ;
    console.log("logged in status :",this.state.loggedin);
    if(!this.state.loggedin){
        console.log("Not Loggedin");
       /*  document.getElementById('email').classList.remove('hide');
        document.getElementById('password').classList.remove('hide');
        document.getElementById('signup').classList.remove('hide');
        document.getElementById('login').classList.remove('hide');
        document.getElementById('logout').classList.add('hide'); */
        hide = "";
        show = "hide";
    }
    else{
        console.log("Loggedin");
        /* document.getElementById('email').classList.add('hide');
        document.getElementById('password').classList.add('hide');
        document.getElementById('signup').classList.add('hide');
        document.getElementById('login').classList.add('hide');
        document.getElementById('logout').classList.remove('hide'); */
        hide = "hide";
        show = "";
    }
return(
<div>
 <input type="email" id="email" className={hide} ref="email" placeholder="Enter your email"></input><br></br>
 <input type="password" id="password" className={hide} ref="password" placeholder="Enter your password"></input>
 <p>{this.state.err}</p>
 <button type="submit" id="login" className={hide} onClick={this.login}>Login</button>
 <button type="submit" id="signup" className={hide} onClick={this.signup}>Signup</button>
 <button type="submit" id="logout" className={show} onClick={this.logout}>Logout</button><br />
 <button type="submit" id="google" className={hide} onClick={this.google}>Sign up with Google</button>
</div>
);
}
}

export default Authenticate;
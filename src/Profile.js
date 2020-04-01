import React,{ Component } from 'react';

class Profile extends Component {
render(){
return(
<div>
    <h2>User Profile </h2>
    <br />
    <div className="card">
    <img  id="profile_image" alt="Profile_Image" />
    <h1>{this.props.name}</h1>
    <b><p className="title">{this.props.email}</p></b>
    <br />
    <button type="submit" id="logout" onClick={this.logout}>Logout</button><br />
    </div>
</div>
);
}
}

export default Profile;
import* as React from "react";

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="card col-lg-2 mt-4 mb-4 mx-3" >
    	  <img src={profile.avatar_url} className="card-img-top" alt={profile.name}/>
        <div className="card-body">
          <div className="card-title display-6">{profile.name}</div>
          <div className="card-text fs-5">{profile.company}</div>
        </div>
    	</div>
    );
  }
}
export default Card;
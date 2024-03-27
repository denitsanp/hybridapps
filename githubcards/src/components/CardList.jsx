import React from 'react';
import Card from './Card'; 

const CardList = (props) => (
	<div className="container">
        <div className="col d-flex justify-content-center flex-wrap">
            {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
        </div>
    </div>
);
export default CardList;

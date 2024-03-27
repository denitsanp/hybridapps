import React from "react";
import CardList from "./CardList";
import Form from "./Form";

class App extends React.Component {
    state = {
      profiles: [],
    };
    addNewProfile = (profileData) => {
        this.setState(prevState => ({
          profiles: [...prevState.profiles, profileData],
      }));
    };
      render() {
        return (
          <div>
            <div className="h1 text-center mt-5 my-3">{this.props.title}</div>
          <Form onSubmit={this.addNewProfile} />
          <CardList profiles={this.state.profiles} />
          </div>
      );
    }	
  }

export default App;


import React, { Component } from 'react';
import '../App.css';

class CustomApi extends Component {
    constructor(props) {
        super(props);
        this.handleId = this.handleId.bind(this);

        this.state = {
            id: '',
            response: [],
        }
    }

    // FOR DELETE
    handleId(event) {
        this.setState({ id: event.target.value });
        console.log(this.state.id)
    }

    // DELETE

    handleDelete(e) {
        const id = document.getElementById("itemID").value; 
        fetch(`/delete/`+ id, {
            method: "DELETE",
        }).then(res => res.json);
        
       alert("Deleted: " + id);
       // after deleting the item we reload the page to auto display the new
       // list of items to the user
       window.location.reload()
    }

    // fetching our custom api of the stored favorites from the user
    componentDidMount() {
        console.log('componentDidMount');
        fetch("/api")
            .then(res => res.json())
            .then((result) => {
                    console.log('Result');
                    this.setState({
                        response: result // get the api and store in response
                    });
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        error
                    });
                }
            )
    }


    render() {
        const { error } = this.state;
        const currentResponse = this.state.response;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else
            return (  
                <div className="App">
                    <link
                     rel="stylesheet"
                     href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                     integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                     crossorigin="anonymous"/>
                    <h2>My List</h2>
                    <div>
                        <h4>Itunes Favorites</h4>
                        <div className="projectContainer">
                            {currentResponse.map(item => (
                                <div className="list">
                                    <small>id: {item.id}</small>
                                    <h6>{item.title}</h6> 
                                    <p>{item.description}</p>
                                    <a href={item.url}>{item.url}</a>
                                </div>
                            ))}
                        </div>
                        <form>
                            <input type="number" id="itemID" placeholder="id" onChange={this.handleId}/>
                            <button className="button"onClick={this.handleDelete} type="button" >DELETE</button>
                        </form>
                    </div>
                </div>
            );

    }
}

export default CustomApi;
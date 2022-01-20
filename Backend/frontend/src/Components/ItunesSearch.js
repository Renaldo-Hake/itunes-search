import React, { Component } from 'react';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class SearchApi extends Component {
    constructor(props) {
        super(props);

        this.getArtist = this.getArtist.bind(this);
        this.option = this.option.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        //POST
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            artist: '',
            response: [],
            option: 'music'
        }
    }

    // get and set the current artist searched
    getArtist(e){
        this.setState({
            artist: e.target.value
        })
        console.log("Stored artist name:" + this.state.artist)
    }

    // fetching our custom api of the stored favorites from the user
    componentDidMount() {
        const search = this.state.artist;
        const media = this.state.option;
        console.log(search)
        console.log('Connected to itunes');
        fetch(`https://itunes.apple.com/search?term=${search}&media=${media}`, {method: "POST"})
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        response: result.results // get the api and store in response
                    });
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        error
                    });
                }
            )
    }

    // POST
    // submit the info to the api created in the backend
    handleSubmit(artist, track) {
        fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    title: artist,
                    description: track,
                }),
            }).then(res => res.json())
            .then(response => alert('Success:', JSON.stringify(response)))
            .catch(error => console.log('Error:', error));
        alert("Added " + track)
    }

    // Function used to get the media type and set the state of the option that will be passed as an entity
    option(){
        const selectedOption = document.getElementById("mediaType");
        const optionValue = selectedOption.value;

        this.setState({
            option: optionValue
        })
    }

    render() {
        const currentResponse = this.state.response;
        console.log(currentResponse)
            return (
                <div className="Itunes">
                    <Form id="formName">
                        <Form.Group>
                            <h3 id="title">Itunes search bar</h3>
                            <Form.Label>Search your favorite items from itunes:</Form.Label>
                            <Form.Control type="text" placeholder="Search..." id="search" name="search" onChange={this.getArtist}/>
                            <div>
                                <select id="mediaType" onChange={this.option}>
                                    <option value="movie">movie</option>
                                    <option value="podcast">podcast</option>
                                    <option value="music">music</option>
                                    <option value="audiobook">audiobook</option>
                                    <option value="shortFilm">short film</option>
                                    <option value="tvSeason">TV show</option>
                                    <option value="software">software</option>
                                    <option value="ebook">ebook</option>
                                    <option value="all">all</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.componentDidMount}>Search</Button>
                    </Form>
                    <div className="itemsContainer">
                        {currentResponse.map(item => (
                            <form className="list" id="artistTrack">
                                <small id="artist">{item.artistName}</small>
                                <h5 className="track">{item.trackName}</h5>
                                <button id="btn" type="button" onClick={() =>this.handleSubmit(item.artistName, item.trackName)}>+</button>
                            </form>
                        ))}
                    </div>
                </div>
            );
    }
}

export default SearchApi;
import React from "react";
import axios from 'axios';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grandmaster: '',
            res: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            [evt.target.name]: value
        });
    }

    handleSubmit(event) {

        axios.get('https://api.chess.com/pub/player/' + this.state.grandmaster)
            .then((res) => {
                console.log(res.data);
                
                return res = true
                

            })

        event.preventDefault();

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Grandmaster Search:
                        <input type="text" value={this.state.grandmaster} onChange={this.handleChange} name="grandmaster" />
                    </label>
                    <br />

                    <label>
                        Submit:
                        <input type="submit" />
                    </label>
                </form>


                <div id="results">
                        <h1>
                            
                        </h1>
                </div>
            </div>
        );
    }
}

export default Search;
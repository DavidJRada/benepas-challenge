import React from "react";
import axios from 'axios';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grandmaster: '',
            res: false,
            player_id: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const value = evt.target.value;
        const noSpaceValue = value.replace(" ",'_');
        this.setState({
            [evt.target.name]: noSpaceValue
        });
    }

    handleSubmit(event) {

        axios.get('https://api.chess.com/pub/player/' + this.state.grandmaster)
            .then((res) => {
                console.log(res.data);

                return this.setState({
                    res: true,
                    player_id: res.data.player_id
                })

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
                    {this.state.res == true && <h3>
                        User Id: {this.state.player_id}
                    </h3>}
                </div>
            </div >
        );
    }
}

export default Search;
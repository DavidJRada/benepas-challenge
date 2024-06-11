import React from "react";
import axios from 'axios';
import { Card } from "react-bootstrap";
import GameCard from "./gameCard.js";


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grandmaster: '',
            res: false,
            player_id: "",
            aprilGamesArray: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        evt.preventDefault();
        const value = evt.target.value;
        const noSpaceValue = value.replace(" ", '_');
        this.setState({
            [evt.target.name]: noSpaceValue,
            aprilGamesArray: []
        });
    }

    handleSubmit(event) {

        axios.get('https://api.chess.com/pub/player/' + this.state.grandmaster)
            .then((res) => {
                    return this.setState({
                        res: true,
                        player_id: res.data.player_id
                    })
                })
              
        axios.get('https://api.chess.com/pub/player/' + this.state.grandmaster + '/games/2024/04')
            .then((res) => {
                let aprilGamesArray = res.data.games

                return this.setState({
                    aprilGamesArray: aprilGamesArray,
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


                <div id="player_id">
                    {this.state.res == true && <div>
                        User Id: {this.state.player_id}
                    </div>} </div>
                <br></br>

                <div id="matches">
                    {this.state.aprilGamesArray.length > 0 != null && <div>
                        Matches:

                        {this.state.aprilGamesArray.map((game) => {
                            if (this.state.grandmaster == game.black.username) {
                                return <GameCard
                                    username={game.white.username}
                                    result={game.black.result} />
                            } else if (this.state.grandmaster == game.white.username) {
                                return <GameCard
                                    username={game.black.username}
                                    result={game.white.result} />
                            }
                        })}


                    </div>}
                </div >
            </div >



        );
    }
}

export default Search;
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

        event.preventDefault()
        // axios.get('https://api.chess.com/pub/player/' + this.state.grandmaster)
        //     .then((res) => {
        //         this.setState({
        //             res: true,
        //             player_id: res.data.player_id
        //         })
        //     })

        // axios.get('https://api.chess.com/pub/player/' + this.state.grandmaster + '/games/2024/04')
        //     .then((res) => {
        //         let aprilGamesArray = res.data.games

        //         return this.setState({
        //             aprilGamesArray: aprilGamesArray,
        //         })
        //     }).catch(function(error){event.preventDefault()})

        let urls = [
            'https://api.chess.com/pub/player/' + this.state.grandmaster + '/games/2024/04',
            'https://api.chess.com/pub/player/' + this.state.grandmaster
        ]
        const requests = urls.map((url) => axios.get(url));
        axios.all(requests).then((responses) => {
            console.log(responses[0].data.games)
            let player_id = responses[1].player_id
            let aprilGamesArray = responses[0].data.games;
            console.log(aprilGamesArray)
            aprilGamesArray.forEach((game) => {

                this.setState({
                    res: true,
                    player_id: player_id,
                    aprilGamesArray: aprilGamesArray,
                })
            }
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Grandmaster Search:
                        <input type="text" minLength={"1"} required value={this.state.grandmaster} onChange={this.handleChange} name="grandmaster" />
                    </label>
                    <br />
                    <br />

                    <label>
                        Submit:
                        <input type="submit" />
                    </label>
                </form>


                <div id="player_id">
                    {this.state.res == true && <div>
                        <h3>User Id: {this.state.player_id}</h3>
                    </div>} </div>
                <br></br>

                <div id="matches">
                    {this.state.res == true && <div>
                        <h3>Matches:</h3>
                        <table>
                            <tr>
                                <th>Opponents <br></br> Username</th>
                                <th>Outcome</th>
                            </tr>
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
                        </table>

                    </div>}
                </div >
            </div >



        );
    }
}

export default Search;
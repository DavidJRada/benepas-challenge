import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grandmaster: '',
            res: {}
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
        fetch('https://api.chess.com/pub/player/' + this.state.grandmaster).then(
            function (response) {
                console.log(response)
                return response.json();
            }
        ).then(function (jsonData) {
            console.log(jsonData)
            return JSON.stringify(jsonData);
        }
        ).then(function (jsonStr) {
            console.log(jsonStr)
            this.setState({ res: jsonStr });
        });
        event.preventDefault();


    }

    render() {
        return (
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
        );
    }
}

export default Search;
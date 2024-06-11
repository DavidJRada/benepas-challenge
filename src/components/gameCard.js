import React from "react";

const GameCard = (props) => {
    return (
        <tr>
            <td>{props.username}</td>
            <td>{props.result}</td>

        </tr>
    );
};

export default GameCard;
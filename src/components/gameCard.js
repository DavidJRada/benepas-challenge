import React from "react";

const GameCard = (props) => {
    return (
        <div className="container-card">
            <ul>Opponent: {props.username}
                <li>
                    Outcome: {props.result}
                </li>
            </ul>
        </div>
    );
};

export default GameCard;
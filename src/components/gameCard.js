import React from "react";

const GameCard = (props) => {
    return (
        <div className="container-card">
            <li>Opponent: {props.username}
                <li>
                    Outcome: {props.result}
                </li>
            </li>
        </div>
    );
};

export default GameCard;
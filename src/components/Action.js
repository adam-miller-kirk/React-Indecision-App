import React from 'react';

//Stateless function component
const Action = (props) => (
    <div>
        <button 
            className="big-button"
            onClick={props.handlePickOption}
            disabled={!props.hasOptions}
            >
                What Should I Do?
            </button>
    </div>
)

export default Action;
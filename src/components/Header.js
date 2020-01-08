import React from 'react';

//Stateless function component
const Header = (props) => (
    <div className="header">
        <div className="container">
            <h1 className="header__title">{props.title}</h1>    
            {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
        </div>
    </div>
)

//Default props for header
Header.defaultProps = {
    title: 'Indecision',
};

export default Header;
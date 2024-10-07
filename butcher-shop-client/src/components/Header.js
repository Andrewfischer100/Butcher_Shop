import React from 'react';

function Header({ username }) {
    return (
        <header>
            <h1>Butcher Shop</h1>
            {username && <div style={{ float: 'right' }}>Logged in as: {username}</div>}
        </header>
    );
}

export default Header;

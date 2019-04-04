import React from 'react';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Comments Section</h1>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

export default Header
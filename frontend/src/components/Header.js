import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
    background-color: #1976d2;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        padding: 10px;
        flex-direction: column;
        text-align: center;
    }
`;

const Title = styled.h1`
    margin: 0;
    font-size: 2rem;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`;

const Nav = styled.nav`
    @media (max-width: 768px) {
        margin-top: 10px;
    }
`;

const NavList = styled.ul`
 list-style-type: none;
    padding: 0;
    display: flex;
    gap: 20px;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
    }
`;

const NavItem = styled.li`
    display: inline;

    @media (max-width: 768px) {
        display: block;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

     &:visited {
        color: white; /* This prevents visited links from turning purple */
    }

    &:active {
        color: white; /* Prevents active state from changing the color */
        background-color: rgba(255, 255, 255, 0.2); /* Optional: subtle background change on click */
    }

    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
`;

const LogoutButton = styled.button`
    background-color: #dc004e;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background-color: #c7003a;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 8px;
    }
`;

function Header() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');

        if (token && storedUsername) {
            setUsername(storedUsername);
        } else {
            setUsername(null);
        }

        // Debugging purpose to check values
        console.log('Token:', token);
        console.log('Username:', storedUsername);
    }, []);

    const handleLogout = () => {
        // Clear the JWT token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        // Redirect to login page after logout
        navigate('/');
        setUsername(null); // Reset the username after logging out
    };

    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <HeaderContainer>
            <Title>Ryan's Butcher Shop Application</Title>
            <Nav>
                <NavList>
                    
                    <NavItem>
                    <StyledLink to="/">Home</StyledLink>
                    </NavItem>
                    
                   

                    <NavItem>
                        <StyledLink to="/about">About</StyledLink>
                    </NavItem>
                                
                    <NavItem>
                    <StyledLink to="/profile">Profile</StyledLink>
                    </NavItem>
                    
                    {isLoggedIn && (
                    <NavItem>
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                    </NavItem>
                    )}
                   
                </NavList>
            </Nav>

            {/* Display username if logged in */}
            {username && <div style={{ float: 'right' }}>Logged in as: {username}</div>}
        </HeaderContainer>
    );
}

export default Header;

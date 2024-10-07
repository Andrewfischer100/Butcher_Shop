import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
    background-color: #1976d2;
    color: white;
    padding: 20px;
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
    gap: 15px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`;

const NavItem = styled.li`
    display: inline;

    @media (max-width: 768px) {
        display: block;
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

    const handleLogout = () => {
        // Clear the JWT token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        // Redirect to login page after logout
        navigate('/');
    };

    // Check if user is logged in and get username
    const isLoggedIn = !!localStorage.getItem('token');
    const username = isLoggedIn ? localStorage.getItem('username') : null;

    return (
        <HeaderContainer>
            <Title>Ryan's Butcher Shop Application</Title>
            <Nav>
                <NavList>
                    <NavItem>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/about">About</Link>
                    </NavItem>

                    {/* Conditional links for logged in users */}
                    {isLoggedIn && (
                        <>
                            <NavItem>
                                <Link to="/profile">Profile</Link>
                            </NavItem>
                            <NavItem>
                                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                            </NavItem>
                        </>
                    )}
                </NavList>
            </Nav>

            {/* Display username if logged in */}
            {isLoggedIn && username && (
                <div style={{ float: 'right' }}>Logged in as: {username}</div>
            )}
        </HeaderContainer>
    );
}

export default Header;

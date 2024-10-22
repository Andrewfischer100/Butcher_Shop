import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
`;

const UserInfo = styled.div`
    margin-bottom: 40px;

    h2 {
        color: #333;
    }

    p {
        color: #555;
    }
`;

const SectionTitle = styled.h3`
    margin-bottom: 20px;
    color: #1976d2;
`;

const Button = styled.button`
    background-color: #dc004e;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #c7003a;
    }
`;

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [joinedDate, setJoinedDate] = useState('');

    // Simulate fetching user data
    useEffect(() => {
        const fetchedUsername = localStorage.getItem('username') || 'John Doe';
        const fetchedEmail = 'johndoe@email.com'; // Example email
        const fetchedJoinedDate = 'January 1, 2024'; // Example date

        setUsername(fetchedUsername);
        setEmail(fetchedEmail);
        setJoinedDate(fetchedJoinedDate);
    }, []);

    const handleChangePassword = () => {
        // Add logic for changing the password
        alert('Change password functionality will be implemented!');
    };

    const handleDeleteAccount = () => {
        // Add logic for deleting the account
        alert('Delete account functionality will be implemented!');
    };

    return (
        <ProfileContainer>
            <UserInfo>
                <h2>Welcome, {username}!</h2>
                <p>Email: {email}</p>
                <p>Joined on: {joinedDate}</p>
            </UserInfo>

            <SectionTitle>Account Settings</SectionTitle>
            <Button onClick={handleChangePassword}>Change Password</Button>

            <SectionTitle>Order History</SectionTitle>
            <p>No orders yet! Start shopping to view your order history.</p>

            <SectionTitle>Favorites & Preferences</SectionTitle>
            <p>You haven't added any favorites yet.</p>

            <SectionTitle>Delete Account</SectionTitle>
            <Button onClick={handleDeleteAccount}>Delete Account</Button>
        </ProfileContainer>
    );
};

export default Profile;

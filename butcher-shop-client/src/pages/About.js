import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;

    h1, h2 {
        color: #333;
    }

    p {
        line-height: 1.6;
        margin-bottom: 20px;
        color: #555;
    }
`;

const About = () => {
    return (
        <AboutContainer>
            <h1>About Us</h1>
            <h2>Welcome to Butcher Shop – A Cut Above the Rest!</h2>
            <p>
                At <strong>Butcher Shop</strong>, we take pride in providing the finest quality meats, carefully sourced and expertly crafted to meet the highest standards. Our passion for premium cuts and traditional butchery goes beyond just meat; it’s about offering an experience that every home chef and grilling enthusiast can trust.
            </p>
            <h2>Why Choose Us?</h2>
            <p>
                <strong>Quality First:</strong> We only work with trusted suppliers who prioritize animal welfare and sustainable farming practices.
            </p>
            <p>
                <strong>Craftsmanship:</strong> Every cut of meat is handled with care by our skilled butchers, who bring years of experience to the table.
            </p>
            <p>
                <strong>Customer Satisfaction:</strong> Whether you’re shopping for a family meal, a weekend BBQ, or a gourmet dinner party, we’re committed to helping you find the perfect cut and ensuring you’re satisfied with your choice.
            </p>
            <h2>Our Offerings</h2>
            <p>
                <strong>Premium Cuts:</strong> From juicy steaks to tender roasts, we offer a wide range of fresh, high-quality beef, pork, lamb, and poultry.
            </p>
            <p>
                <strong>Specialty Items:</strong> Looking for something unique? We also provide artisanal sausages, dry-aged beef, and custom cuts on request.
            </p>
            <p>
                <strong>Expert Advice:</strong> Need help picking the right cut? Our butchers are here to offer tips on how to prepare, cook, and serve your meats to perfection.
            </p>
            <h2>Our Promise</h2>
            <p>
                We believe that good food brings people together. That’s why we strive to deliver not only great products but also an unmatched level of service. From our counter to your kitchen, you can trust us to bring you the very best every time.
            </p>
            <p>Visit us today, and let’s make your next meal unforgettable!</p>
        </AboutContainer>
    );
};

export default About;

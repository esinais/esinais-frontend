import React from "react";
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

import logo from './lg1.png'



function Home() {
    return (

        <Figure>
            <Figure.Image
                width={40}
                height={40}
                alt="171x180"
                src="./Homem.png"
            />
        </Figure>
    );
}

export default Home;

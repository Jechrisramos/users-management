import React, { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, Image, Button } from "react-bootstrap";

export default function Profile(){
    
    // variables
    const { userId } = useParams();

    // useState
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // useEffect
    useEffect(()=>{
        fetch(`https://reqres.in/api/users/${userId}`)
        .then(response => response.json())
        .then(result => {
            setAvatar(result.data.avatar);
            setEmail(result.data.email);
            setFirstName(result.data.first_name);
            setLastName(result.data.last_name);
        });
    }, []);

    // functions
    return(
        <Row className="hero">
            <div className="heroContent d-flex align-items-center">
                <Col xl={4}></Col>
                <Col xl={4}>
                    <Card className="profileCard">
                        <Card.Body>
                            <Card.Title>
                                <Image src={avatar} roundedCircle/>
                                <h1>{ `${firstName} ${lastName}` }</h1>
                            </Card.Title>
                            <Card.Text>
                                <div className="contactInfo">
                                <a className="contactInfoItem" href={`mailto:${email}`}><i class="fas fa-envelope"></i>&nbsp;{email}</a>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Link className="navigate" to="/users">View All Users</Link>
                </Col>
                <Col xl={4}></Col>
            </div>
        </Row>
    ); //end of return
} //end of Profile
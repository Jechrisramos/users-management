import React, { useContext } from "react";
import UserContext from "../UserContext";

import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";

export default function Home(){

    // variables
    const { user } = useContext(UserContext);
    // useStates

    // useEffect

    // functions

    return(
        <Row className="hero">
            <div className="heroContent d-flex align-items-center">
                <Col xl={7}>
                    <Image className="heroImage" src="https://image.flaticon.com/icons/png/512/747/747545.png" />
                </Col>
                <Col xl={5} id="heroHeadlineCol">
                    <h1>
                        <span className="primaryHeading">Welcome</span>
                        <span className="secondaryHeading">{`${user.firstName} ${user.lastName}`}</span>
                    </h1>
                    <div className="contactInfo">
                        <a className="contactInfoItem" href={`mailto:${user.email}`}><i class="fas fa-envelope"></i>&nbsp;{user.email}</a>
                        <a className="contactInfoItem" href="tel:+635552368"><i class="fas fa-phone-alt"></i>&nbsp;(+63) 123-1234-1234</a>
                    </div>
                </Col>
            </div>
        </Row>
    ); //end of return
} //end of Home()
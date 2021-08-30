import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
    
    return(
        <footer>
            <Container>
                <Row>
                    <Col xs={6}>
                        <p id="copyright">User Management &copy;&nbsp;2021</p>
                    </Col>
                    <Col xs={6}>
                        <p id="rights">All Right Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
} //end of Footer()
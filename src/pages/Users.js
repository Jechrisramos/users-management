import React, { Fragment, useState, useEffect } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import Userlist from "../components/Userlist";

import Pagination from "../components/Pagination";

export default function Users(){

    // variables

    // useStates
        const [ allUsers, setAllUsers ] = useState([]);
        const [perPage, setPerPage] = useState(0);
        const [totalData, setTotalData] = useState(0);

    //useEffect
        useEffect(() => {
            fetchData();
        }, []);
    
    // functions
        const fetchData = async (currentPage) => {
           await fetch(`https://reqres.in/api/users?per_page=10&page=${ currentPage }`)
            .then(response => response.json())
            .then(result => {
                setPerPage(result.per_page);
                setTotalData(result.total);
                
                setAllUsers(result.data);
            }).catch(error => console.log(error));
        }
        
    return(
        <Fragment>
        <Row className="InternalHero">
            <div className="heroContent d-flex align-items-center">
                <Col>
                    <h1>Users</h1>
                </Col>
            </div>
        </Row>
        <Container>
            <Row className="usersList d-flex align-items-top">
                <Col xs={12}>
                    <Userlist 
                        allUsers={ allUsers } 
                        setAllUsers={ setAllUsers }
                        fetchData={ fetchData }
                        />
                </Col>

                <Col xs={12}>
                <Pagination 
                    perPage={ perPage } 
                    totalData={ totalData }
                    fetchData={ fetchData }/>
                </Col>
            </Row>
            
        </Container>
        </Fragment>
    ); //end of return
} //end of Users()
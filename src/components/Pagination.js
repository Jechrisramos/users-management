import React from "react";
import { Nav, Button } from "react-bootstrap";

export default function Pagination(props){
    const { perPage, totalData, fetchData } = props;
    
    const pageNumbers = [];

    for(let i = 1; i<= Math.ceil(totalData / perPage); i++){
        pageNumbers.push(i);
    }

    const pages =  pageNumbers.map(number => {
        return(
            <Button 
                id={number} 
                onClick={() => fetchData(number)} 
                className="mx-1"
            >
                {number}
            </Button>
        );
    });

    return(
        <Nav xs={12} className="d-flex justify-content-center mb-3">
            { pages }
        </Nav>
    );
} //end of Pagination
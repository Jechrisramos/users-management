import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Image, Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Users(props){

    // variables
    const { allUsers, fetchData, setAllUsers } = props;

    // useStates
    const [userId, setUserId] = useState([]); //add a state for courseId for the fetch URL

    const [users, setUsers] = useState();

    // state for add new user form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const avatar = "https://image.flaticon.com/icons/png/512/1177/1177568.png"; //placholder avatar image

    // state for add new user Modal
    const [showAdd, setShowAdd] = useState(false);
    // state for edit user modal
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (user) => {
        setUserId(user.id);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setShowEdit(true);
    }//end openEdit()

    const closeEdit = () => {
        setShowEdit(false);
        setFirstName("");
        setLastName("");
        setEmail("");
    }
    //useEffect
    //GET ALL USERS LIST
    useEffect(()=> {
        const usersArray = allUsers.map((user, index, array) => {
            return(
                <tr id={user.id} key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.id}</Link></td>
                    <td><Image src={user.avatar} roundedCircle className="avatarThumbnail"/></td>
                    <td><Link to={`/users/${user.id}`}>{user.email}</Link></td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                        <Button 
                            variant="success" 
                            size="sm" 
                            onClick={()=> openEdit(user)}
                        >
                            EDIT
                        </Button>
                        <Button 
                            variant="danger" 
                            size="sm"
                            onClick={()=> onDelete(index, user.id)}
                        >DELETE</Button>
                    </td>
                </tr>
            );
            }); //end of usersArray

            setUsers(usersArray);
    }, [allUsers]); //end of useEffect

    // functions
        //CREATE
        //function to handle opening and closing of Add New User Modal
        const openAdd = () => setShowAdd(true);
        const closeAdd = () => setShowAdd(false);
              
        const addUser = async (e) => {
            e.preventDefault();

            if(firstName.length < 2){
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Please input your complete First Name. Please try again." 
                });
            }else if(lastName.length < 2){
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Please input your complete Last Name. Please try again." 
                });
            }else if(email.length < 5){
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Please input a valid Email Address. Please try again." 
                });
            }else{
                await fetch('https://reqres.in/api/users/', {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json; charset=UTF-8",
                    },
                    body : JSON.stringify({
                        avatar : avatar,
                        email : email,
                        first_name : firstName,
                        last_name : lastName
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data){
                        //fetchData(); //renders the changes
                        allUsers.push(data);
                        setAllUsers((allUsers) => [...allUsers]);
                        // setAllUsers((allUsers)=> [...allUsers, data]);
                        console.log(data);
                        Swal.fire({
                            title : "Success",
                            icon : "success",
                            text : `"New User successfully added."`
                        });
                        //resets all form fields' states
                        setEmail("");
                        setFirstName("");
                        setLastName("");

                        closeAdd(); //closes the modal pop-up
                    }else{
                        fetchData(); //renders the changes
                        Swal.fire({
                            title : "Whoops!",
                            icon : "error",
                            text : "Something went wrong. Please try again." 
                        });
                    }
                }).catch(error => console.log(error));
            }
        } //end of addUser()

        //UPDATE
        const editUser = async (e, userId) => {
            e.preventDefault();

            if(firstName.length < 2){
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Please input your complete First Name. Please try again." 
                });
            }else if(lastName.length < 2){
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Please input your complete Last Name. Please try again." 
                });
            }else if(email.length < 5){
                Swal.fire({
                    title : "Whoops!",
                    icon : "error",
                    text : "Please input a valid Email Address. Please try again." 
                });
            }else{
               await fetch(`https://reqres.in/api/users/${userId}`, {
                    method : "PUT",
                    headers : {
                        "Content-Type" : "application/json; charset=UTF-8"
                    },
                    body : JSON.stringify({
                            email : email,
                            first_name : firstName,
                            last_name : lastName
                        })
                    })
                    .then(response => response.json())
                    .then(updatedUser =>{
                        if(updatedUser){
                            const userToUpdate = allUsers.find(result => result.id == userId ); //fetched the object
                            //assigned the value from the inputs to the properties of the userToUpdate Object
                            userToUpdate.email = email; 
                            userToUpdate.first_name = firstName;
                            userToUpdate.last_name = lastName;

                            setAllUsers((userToUpdate) => [...allUsers]); //saved the userToUpdate
                            Swal.fire({
                                title : "Success",
                                icon : "success",
                                text : `"User successfully Updated."`
                            });
                            closeEdit();
                        }else{
                            fetchData();
                            Swal.fire({
                                title : "Whoops!",
                                icon : "error",
                                text : "Failed to Update Course. Please try again." 
                            });
                        }
                    }).catch(error => console.log(error));
                }
            }
            
        //DELETE
        const onDelete = async (index, userId) => {
           await fetch(`https://reqres.in/api/users/${userId}`, {
                method : "DELETE"
            })
            .then(response => {
                if(response.status !== 204){ //it should return 204 no content status.
                    Swal.fire({ //otherwise will return error message
                        title : "Success",
                        icon : "success",
                        text : `"User successfully Deleted."`
                    });
                    fetchData();
                }else{ //else, continue splice the item from the allUser array
                    allUsers.splice(index, 1); //removing the item from the allUsers array
                    setAllUsers((allUsers) => [...allUsers]); //since it is changed, we now set it again.
                    Swal.fire({
                        title : "Success",
                        icon : "success",
                        text : `"User successfully Deleted."`
                    });
                }
            }).catch(error => console.log(error));
        }
    return(
        <Fragment>
            <Button variant="primary" className="mb-3" onClick={openAdd}>ADD USER</Button>
            <Table striped bordered hover responsive>
                <thead className="bg-dark text-white">
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { users }
                </tbody>
            </Table>

            {/* Create New User Modal */}
            <Modal show={showAdd} onHide={closeAdd}>
                <Form onSubmit={ e => addUser(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={firstName} 
                                onChange={e => setFirstName(e.target.value)}
                                placeholder="Enter your First Name" 
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={lastName} 
                                onChange={e => setLastName(e.target.value)}
                                placeholder="Enter your Last Name" 
                                required 
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your Email Address" 
                                required 
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAdd}>CANCEL</Button>
                        <Button variant="success" type="submit">SUBMIT</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Edit User Modal */}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={ e => editUser(e, userId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={firstName} 
                                onChange={e => setFirstName(e.target.value)}
                                placeholder="Enter your First Name" 
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={lastName} 
                                onChange={e => setLastName(e.target.value)}
                                placeholder="Enter your Last Name" 
                                required 
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your Email Address" 
                                required 
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>CANCEL</Button>
                        <Button variant="success" type="submit">SUBMIT</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Fragment>
    ); //end of return
} //end of Users()
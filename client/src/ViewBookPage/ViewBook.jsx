/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Material from "@mui/material";
import { Box } from "@mui/material";
import { authenticationService, bookService, userService } from "services";
function ViewBook() {
    const { state } = useLocation();
    const [book, setBook] = useState(state.book);
    const [issued, setIssued] = useState(false);
    useEffect(() => {
        console.log(book);
        bookService.get(book.id).then((b) => {
            setBook(b);
        });
        if (
            book.issued_by.find(
                (id) => authenticationService.currentUserValue.id == id,
            )
        )
            setIssued(true);
        else setIssued(false);
        console.log(issued);
    }, []);

    const setIssuedStat = (val) => {
        userService.getById(authenticationService.currentUserValue.id).then(res=>{
            console.log(res.data);
            localStorage.setItem('currentUser',JSON.stringify(res.data))
            authenticationService.currentUserSubject.next(res.data)
        })

        setIssued(val);
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                margin: "50px",
            }}
        >
            <Material.Paper
                sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Material.Grid
                    container
                    sx={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Material.Grid>
                        <Box
                            sx={{
                                width: "150px",
                                height: "200px",
                                margin: "30px",
                            }}
                        >
                            <Material.Paper
                                sx={{
                                    width: "150px",
                                    height: "200px",
                                }}
                                elevation={5}
                            >
                                Book
                            </Material.Paper>
                        </Box>
                        <h3 className="m-3">Name: {book.bookname}</h3>
                        <h3 className="m-3">Author: {book.author}</h3>
                        <h3 className="m-3">Publication Year: {book.publication_year}</h3>
                        <h3 className="m-3">Category: {book.category}</h3>
                        <Box className="ms-5 mb-3">
                            {!issued && (
                                <Material.Button
                                    variant="contained"
                                    onClick={() => {
                                        bookService
                                            .borrow(
                                                authenticationService.currentUserValue.id,
                                                book.id,
                                            )
                                            .then((res) => {
                                                alert(res.message);
                                                setIssuedStat(true);
                                            })
                                            .catch((err) => alert(err));
                                    }}
                                >
                                    Borrow
                                </Material.Button>
                            )}
                            {issued && (
                                <Material.Button
                                    variant="contained"
                                    onClick={() => {
                                        bookService
                                            .take(authenticationService.currentUserValue.id, book.id)
                                            .then((res) => {
                                                alert(res.message);
                                                setIssuedStat(false);
                                    })
                                .catch((err) => alert(err));
                                    }}
                                >
                            Give Back
                        </Material.Button>
                            )}
                    </Box>
                </Material.Grid>
            </Material.Grid>
        </Material.Paper>
        </Box >
    );
}

export default ViewBook;

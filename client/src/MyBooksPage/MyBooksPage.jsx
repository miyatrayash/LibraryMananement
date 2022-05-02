/** @format */

import React, { useState, useEffect } from "react";
import { authenticationService, bookService } from "services";
import * as Material from "@mui/material";
import { Box } from "@mui/material";
import BookCard from "components/Card";

import { Component } from 'react'

export default class MyBooksPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: null
        }
        this.getBooks = this.getBooks.bind(this)
    }

     componentDidMount() {

        console.log("in Books");
        this.getBooks();
    }

    getBooks() {
        const bookIds = authenticationService.currentUserValue.books;
        console.log(bookIds)
        bookService.getbooks(bookIds).then(res => {
            this.setState({ books: res.books });
            console.log(res);
        })
        // bookService
        //     .getAll({ category: "Fiction" }, this.props.sort, 7)
        //     .then((books) => {
        //         this.setState({ books: books });
                
        //     });
        console.log("not here")
    }
    render() {
        return <>
            {this.state.books && <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                    margin: "50px",
                }}
            >
                <Material.Grid container>
                    {
                        this.state.books.map((book) => {
                            return <BookCard key={book.id} book={book} />;
                        })}
                </Material.Grid>
            </Box>}
        {!this.state.books && <Material.CircularProgress/>}
        </>;
    }
}




// export default MyBooksPage;

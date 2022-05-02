import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { bookService } from "services";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

function EditBookPage() {

    const history = useNavigate();
    const location = useLocation();
    const state = location.state;
    var initialValues = {
        bookname: state.book.bookname,
        author: state.book.author,
        publication_year: state.book.publication_year,
        copies: state.book.copies,
        category: state.book.category,
    };

    function handleEdit(
        {
            bookname,
            author,
            publication_year,
            copies,
            category
        },
        { setStatus, setSubmitting },
    ) {
        bookService
            .edit({
                id:state.book.id,
                bookname,
                author,
                publication_year,
                copies,
                category
            })
            .then((e) => {
                // window.location.reload();
                console.log(e)
                alert("Updated SucessFully");
                history('/');

            })
            .catch((error) => {
                setSubmitting(false);
                setStatus(error.message);
            });
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h2 className="card-title text-center">Edit</h2>
                            <hr className="mb-5"></hr>
                            <div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={Yup.object().shape({
                                        bookname: Yup.string().required("bookname is required"),
                                        author: Yup.string().required("author is required"),
                                        publication_year: Yup.number().required("Publication year is required"),
                                        category: Yup.string().required("category is required"),
                                        copies: Yup.number().required('Number Of Copies is Required')

                                    })}
                                    onSubmit={handleEdit}
                                >
                                    {({
                                        setFieldValue,
                                        values,
                                        errors,
                                        status,
                                        touched,
                                        isSubmitting,
                                    }) => (
                                        <Form>
                                            <div className="form-group">
                                                <ErrorMessage
                                                    name="bookname"
                                                    component="div"
                                                    className="invalid-feedback form-floating mb-3 d-flex justify-content-end px-3"
                                                />

                                                <div className="mb-3 d-flex justify-content-end">
                                                    <label htmlFor="bookName" id="lblFN">
                                                        Book Name
                                                    </label>
                                                    <Input
                                                        name="bookname"
                                                        type="bookname"
                                                        // label="lblFN"
                                                        className={
                                                            "form-control mx-3" +
                                                            (errors.bookname && touched.bookname
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                        value={values["bookname"]}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <ErrorMessage
                                                    name="author"
                                                    component="div"
                                                    className="invalid-feedback form-floating mb-3 d-flex justify-content-end px-3"
                                                />
                                                <div className="mb-3 d-flex  justify-content-end">
                                                    <label htmlFor="author" id="lblLN">
                                                        Author
                                                    </label>
                                                    <Input
                                                        name="author"
                                                        type="author"
                                                        className={
                                                            "form-control mx-3" +
                                                            (errors.author && touched.author
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                        value={values["author"]}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <ErrorMessage
                                                    name="publication_year"
                                                    component="div"
                                                    className="invalid-feedback form-floating mb-3 d-flex justify-content-end px-3"
                                                />
                                                <div className="mb-3 d-flex  justify-content-end">
                                                    <label htmlFor="publication_year" id="lblUser">
                                                        Publication Year
                                                    </label>
                                                    <Input
                                                        name="publication_year"
                                                        type="publicaiton_year"
                                                        className={
                                                            "form-control mx-3" +
                                                            (errors.publication_year && touched.publication_year
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                        value={values["publication_year"]}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <ErrorMessage
                                                    name="category"
                                                    component="div"
                                                    className="invalid-feedback form-floating mb-3 d-flex justify-content-end px-3"
                                                />
                                                <div className=" mb-3 d-flex justify-content-end">
                                                    <label htmlFor="category" id="lblcategory">
                                                        category
                                                    </label>

                                                    {/* <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            Dropdown Button
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown> */}

                                                    <Input
                                                        name="category"
                                                        type="category"
                                                        className={
                                                            "form-control mx-3" +
                                                            (errors.category && touched.category
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                        value={values["category"]}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <ErrorMessage
                                                    name="copies"
                                                    component="div"
                                                    className="invalid-feedback form-floating mb-3 d-flex justify-content-end px-3"
                                                />
                                                <div className=" mb-3 d-flex justify-content-end">
                                                    <label htmlFor="copies" id="lblcopies">
                                                        copies
                                                    </label>
                                                    <Input
                                                        name="copies"
                                                        type="copies"
                                                        className={
                                                            "form-control mx-3" +
                                                            (errors.copies && touched.copies
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                        value={values["copies"]}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </div>
                                            </div>
                                            {status && (
                                                <div className={"alert alert-danger"}>
                                                    {status.toString()}
                                                </div>
                                            )}

                                            <div className="d-grid justify-content-center">
                                                <Button
                                                    type="submit"
                                                    value="Edit"
                                                    onClick={() => {

                                                    }}
                                                ></Button>
                                                {isSubmitting && (
                                                    <img alt='load' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                )}
                                                <Button
                                                    value="Cancel"
                                                    onClick={() => {
                                                        history("/");
                                                    }}
                                                ></Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBookPage
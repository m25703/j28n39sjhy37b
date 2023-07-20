import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreateCard() {
  const { authState } = useContext(AuthContext);

  let history = useHistory();
  const initialValues = {
    question: "",
    answer: ""
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    question: Yup.string().required("You must input a question!"),
    answer: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(data);
        history.push("/");
      });
  };

  return (
    <div className="CreateCardPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Question: </label>
          <ErrorMessage name="question" component="span" />
          <Field
            autoComplete="off"
            id="inputCreateCard"
            name="question"
            placeholder="(Ex. Question...)"
          />
          <label>Answer: </label>
          <ErrorMessage name="answer" component="span" />
          <Field
            autoComplete="off"
            id="inputCreateCard"
            name="answer"
            placeholder="(Ex. Post...)"
          />

          <button type="submit"> Create Card</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateCard;

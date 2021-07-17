import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import Loader from '../UI/Loader';
import Message from '../UI/Message';
import FormContainer from '../Form/FormContainer';
import Input from '../Form/Input';
import Btn from '../UI/Btn';

function AdminEdit({
  heading,
  inputs,
  editProduct,
  editUser,
  submitHandler,
  buttonLabel,
  uploading,
  uploadFileHandler,
  value,
  onChange,
  loading,
  loadingUpdate,
  errorUpdate,
  error,
}) {
  const history = useHistory();

  return (
    <>
      <Btn outlinePrimary margin onClick={() => history.goBack()}>
        Back
      </Btn>
      <FormContainer>
        <h1>{heading}</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message text={errorUpdate} />}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message text={error} />
        ) : (
          <Form onSubmit={submitHandler}>
            {inputs.map((input, index) => (
              <Input key={index} input={input} />
            ))}

            {editProduct && (
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={value}
                  onChange={onChange}></Form.Control>
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}></Form.File>
                {uploading && <Loader />}
              </Form.Group>
            )}

            {editUser && (
              <Form.Group controlId='isadmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={value}
                  onChange={onChange}></Form.Check>
              </Form.Group>
            )}

            <Btn submit>{buttonLabel}</Btn>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default AdminEdit;

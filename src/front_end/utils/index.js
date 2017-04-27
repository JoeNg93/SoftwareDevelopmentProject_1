import React from 'react';
import validator from 'validator';
import { XmlEntities as Entities } from 'html-entities';
import _ from 'lodash';

const entities = new Entities();

export const renderField = ({ input, label, type, className, meta: { touched, error } }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input { ...input } type={type} className={ className ? className : ''} />
      {touched && error && <span style={{ color: 'red', fontSize: '13px' }}>{error}</span>}
    </div>
  );
}

export const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'This field is required';
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!values.password) {
    errors.password = 'This field is required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum length of password is 6'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'This field is required';
  } else if (values.password != values.confirmPassword) {
    errors.confirmPassword = 'Confirm password doesnt match';
  }

  return errors;
}

export const encodeInput = props => _.mapValues(props, value => entities.encode(value));
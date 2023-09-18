import React from 'react';

const ErrorMessage = props => {
    return (
      props.error
        ? <div className="alert alert-danger" role="alert">{props.error}</div>
        : null
    );
  }
export default ErrorMessage
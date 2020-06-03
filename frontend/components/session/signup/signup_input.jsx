import React from 'react';

const SignupInput = 
({ type, field, text, formData, handleInput, validateInput, displayError, errorMessages }) => {
  const error = displayError[field] ? (
    <div className="signup-error">
      <div className="error-triangle-outline"></div>
      <div className="error-triangle-fill"></div>
      {errorMessages[field]}
    </div>
  ) : null
  
  return (
    <div className="signup-input-container">
      <input
        className={"signup-input" + displayError[field] ? "signup-input-error" : ""}
        type={type}
        placeholder={text}
        value={formData[field]}
        onChange={handleInput(field)}
        onBlur={validateInput(field)}
      />
      {error}
    </div>
  )
}

export default SignupInput;
import React from 'react';

const SignupInput = 
({ type, field, text, formData, handleInput, validateInput, displayError, errorMessages, id }) => {
  // Idea for the spur of the error balloon being two triangles, one for border color and smaller for fill
  // color, came from https://www.sitepoint.com/pure-css3-speech-bubbles/ -- Check with TA about whether allowed
  // idea of using borders to make triangles in CSS came from https://css-tricks.com/working-with-shapes-in-web-design/
  const error = displayError[field] ? (
    <div className="signup-error">
      <div className="error-triangle-outline"></div>
      <div className="error-triangle-fill"></div>
      {errorMessages[field]}
    </div>
  ) : null
  
  return (type === 'checkbox') ? (
    <div className="signup-input-container">
      <input
        id={id}
        className={"signup-input" + (displayError[field] ? " signup-input-error" : "")}
        type={type}
        value={formData[field]}
        onChange={handleInput(field)}
        onBlur={validateInput(field)}
      /> <label htmlFor={id}>{text}</label>
      {error}
    </div>
  ): (
    <div className="signup-input-container">
      <input
        className={"signup-input" + (displayError[field] ? " signup-input-error" : "")}
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
import React, { useState } from 'react';
// import '../styles/style.css'; // Ensure the path to your CSS file is correct 
import logo from './logo.svg'; // Importing logo.svg

const PasswordResetForm = () => {
    const [formState, setFormState] = useState('signIn');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignInClick = () => setFormState('signIn');
    const handleSignUpClick = () => setFormState('signUp');
    const handleLostPasswordClick = () => setFormState('lostPassword');

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = {
          emailAddress: email,
          newPassword: newPassword,
      };
  
      try {
          const response = await fetch('/api/updatePassword', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
  
          const data = await response.json();
          if (response.ok) {
              setMessage(data.message);
              setEmail('');
              setNewPassword('');
              setConfirmNewPassword('');
          } else {
              setMessage(data.error || 'Failed to update password');
          }
      } catch (error) {
          setMessage(`Error: ${error.toString()}`);
      }
  };

    return (
      <>
      <style>
        {`
      {
  margin: 0;
  padding: 0;
  font-family: 'poppins', sans-serif;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 50, 0.8), rgba(0, 0, 50, 0.8)), url(/logo.svg);
  background-position: center;
  background-size: cover;
  position: relative;
}

.form-box {
  width: 90%;
  max-width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 50px 60px 70px;
  text-align: center;
}

.form-box h1 {
  font-size: 30px;
  margin-bottom: 60px;
  color: #3c00a0;
  position: relative;
}

.form-box h1::after {
  content: '';
  width: 30px;
  height: 4px;
  border-radius: 3px;
  background: #3c00a0;
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translate(-50%);
}

.input-field {
  background: #eaeaea;
  margin: 15px 0;
  border-radius: 3px;
  display: flex;
  align-items: center;
  max-height: 65px;
  transition: max-height 0.5s;
  overflow: hidden;
}

input {
  width: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  padding: 18px 15px;
}

.input-field i {
  margin-left: 15px;
  color: #999;
}

form p {
  text-align: left;
  font-size: 13px;
}

form p a {
  background: #3c00a0;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  display: inline-block;
  text-decoration: none;
  transition: background 0.3s ease;
}

form p a:hover {
  background: darken(#3c00a0, 10%);
}

.btn-field {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.btn-field button {
  flex-basis: 48%;
  background: #3c00a0;
  color: #fff;
  height: 40px;
  border-radius: 20px;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-field button:hover {
  background-color: darken(#3c00a0, 10%);
}

.input-group {
  height: 280px;
}

.btn-field button.disable {
  background: #eaeaea;
  color: #555;
}

input:focus, button:focus {
  outline: none;
  border-color: #3c00a0;
  box-shadow: 0 0 5px #3c00a0;
}
/* Add responsive design adjustments */
@media (max-width: 768px) {
  .form-box {
      width: 80%;
      padding: 40px 30px 50px;
  }
}
/* Customize placeholder text color */
input::placeholder {
  color: #999;
}
/* Enhance focus styles for accessibility */
input:focus, button:focus, a:focus {
  outline: 2px solid #3c00a0; /* More noticeable outline */
  box-shadow: 0 0 5px rgba(60, 0, 160, 0.5); /* Soft glow effect */
}
/* Make the submit button stand out */
.submit-btn {
  background-color: #4CAF50; /* A green color */
  color: white;
  padding: 12px 24px; /* Bigger padding */
  margin-top: 20px; /* More space from the above elements */
  border: none;
  border-radius: 4px; /* Rounded corners */
  cursor: pointer;
  width: 50%; /* Making the button half the size of others */
  align-self: center; /* Centering the button */
  transition: background 0.3s ease;
}

/* Adjusting the message display */
.message-success, .message-error {
  color: #008000; /* Green color for success messages */
  margin-top: 30px; /* More space from the above elements */
  font-size: 1.1rem; /* Larger font size */
  font-weight: bold;
}

.message-error {
  color: #FF0000; /* Red color for error messages */
}

/* Additional spacing and alignment fixes */
.form-box {
  padding: 50px 60px 90px; /* Increase bottom padding */
}

.input-field {
  margin-bottom: 20px; /* Increase space between input fields */
}
`}
</style>
        <div className="container" style={{ backgroundImage: `linear-gradient(rgba(0,0,50,0.8), rgba(0,0,50,0.8)), url(${logo})` }}>
            <div className="form-box">
                <h1 id="title">{formState === 'signUp' ? "Sign Up" : formState === 'signIn' ? "Sign In" : "Lost Password"}</h1>
                <form onSubmit={handleSubmit}>
                    {formState !== 'signIn' && (
                        <div className="input-field" id="nameField">
                            <input type="text" placeholder="Name" />
                        </div>
                    )}
                    <div className="input-field">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    {formState === 'lostPassword' && (
                        <div className="input-field">
                            <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>
                    )}
                    <div className="btn-field">
                        {formState !== 'signIn' && (
                            <button type="button" onClick={handleSignInClick}>Sign In</button>
                        )}
                        {formState !== 'signUp' && (
                            <button type="button" onClick={handleSignUpClick}>Sign Up</button>
                        )}
                        {formState !== 'lostPassword' && (
                            <button type="button" onClick={handleLostPasswordClick}>Lost Password</button>
                        )}
                    </div>
                    <div className="message">{message}</div>
                    <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
        </>
    );
};
export default PasswordResetForm;

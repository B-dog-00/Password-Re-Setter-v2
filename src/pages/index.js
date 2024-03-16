import React, { useState } from 'react';
// import '../styles/style.css'; // Ensure the path to your CSS file is correct 
import logo from './logo.svg'; // Importing logo.svg

const PasswordResetForm = () => {
    const [formState, setFormState] = useState('signIn');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (formState === 'lostPassword' && newPassword !== confirmNewPassword) {
          setMessage('Error: Passwords do not match.');
          return;
      }
  
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
  

    const handleLostPasswordClick = () => setFormState('lostPassword');


    return (
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
                            <button type="button" onClick={() => setFormState('signIn')}>Sign In</button>
                        )}
                        {formState !== 'signUp' && (
                            <button type="button" onClick={() => setFormState('signUp')}>Sign Up</button>
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
    );
};
export default PasswordResetForm;

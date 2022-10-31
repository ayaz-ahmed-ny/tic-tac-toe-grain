import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MuiButton from '@mui/material/Button';
import { LoginProps } from '../game.models';

function Login(props: LoginProps) {
  const [username, setUsername] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    return username ? props.onLogin(username) : null;
  };
  return (
    <div className="login-form">
      <form onSubmit={onSubmit}>
        <div className="login-form_field">
          <TextField
            id="outlined-basic"
            label="Username"
            value={username}
            error={isSubmitted && !username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-form_field">
          <MuiButton type="submit" variant="contained">
            {' '}
            Login{' '}
          </MuiButton>
        </div>
      </form>
    </div>
  );
}

export default Login;

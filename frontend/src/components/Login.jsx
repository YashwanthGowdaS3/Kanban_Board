import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const SubmitButton = styled.button`
  background-color: #007bff; // Example blue color
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }
`;

 



function Login(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();


    async function loginUser() {
        const searchParams = new URLSearchParams();
        searchParams.append('username', username);
        searchParams.append('password', password);

        const response = await fetch('/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: searchParams.toString()
        });
        const data = await response.json();

        return data;
    }


    function handleSubmit(e) {
        e.preventDefault();
        
        loginUser().then(data => {
            props.setToken(data.access_token);
            localStorage.setItem('token', JSON.stringify(data.access_token));
            history.push("/");
        });
    }

    return (
        <div style={{display:"flex", flexDirection:"row",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <FormContainer onSubmit={handleSubmit}>
                <p><span style={{marginRight:"10px",fontFamily:"Roboto"}}>Username</span> <InputField type="text" onChange={e => setUsername(e.target.value)} /></p> 
                <p><span style={{marginRight:"10px"}}>Password</span><InputField type="password" onChange={e => setPassword(e.target.value)} /></p>
                <p><SubmitButton>Login</SubmitButton></p>
            </FormContainer>
        </div>
    )
}

export default Login;

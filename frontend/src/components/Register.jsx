import React,{ useState } from "react";
import { useHistory } from "react-router-dom";
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
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
function Register(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    function handleSubmit(e){
        e.preventDefault();

        createUser().then(data => {
            props.setToken(data.access_token);
            localStorage.setItem('token', JSON.stringify(data.access_token));
            history.push('/');
        })
    }
    async function createUser(){
        const formData={
            username: username,
            password: password
        };
        const response = await fetch('/users',{
            method: "POST",
            headers: {"Content-Type":"application/json",

            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    } 

    return(
        <form onSubmit={handleSubmit}> 
            <p>
                Username <input type="text" onChange={e => setUsername(e.target.value)}/>
            </p>
            <p>
                Password <input type= "password" onChange={e => setPassword(e.target.value)}/>
            </p>
            <p>
                <button>Register</button>
            </p>
        </form>
    )
}

export default Register

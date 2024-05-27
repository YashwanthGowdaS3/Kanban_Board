import React,{ useState } from "react";
import { useHistory } from "react-router-dom";
function Register(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function handleSubmit(e){
        e.preventDefault();

        createUser().then(data => {
            props.setToken(data.access_token);
            localStorage.setItem('token', JSON.stringify(data.access_token));
        })
    }
    async function createHashRouter(){
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
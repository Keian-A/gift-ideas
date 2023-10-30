import './Login.css';
import { useState } from 'react';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Login({ setValidated, setList, setCurrentMember }) {

    // Credentials
    const [cred, setCred] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        switch (e.target.id) {
            case "username":
                let temp = e.target.value;
                temp = temp.toLowerCase();
                setCred({ username: temp, password: cred.password });
                setCurrentMember(e.target.value);
                break;
            case "password":
                setCred({ username: cred.username, password: e.target.value });
                break;
            default:
                console.error('This default error should never be hit. Please contact Keian if you see this.');
        }
    }

    const validateUser = (e) => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/validate`, cred).then(({ data }) => {
            setValidated(true);
            setList(data);
        });
    }

    return (
        <div id="Login">
            <form onSubmit={validateUser} >
                <label>Username</label>
                <input id='username' type='text' onChange={handleChange} />
                <label>Password</label>
                <input id='password' type='password' onChange={handleChange} />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;

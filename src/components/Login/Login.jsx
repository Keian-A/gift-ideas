import './Login.css';
import { useState } from 'react';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Login({ setValidated, setList, setCurrentMember }) {

    // Credentials
    const [cred, setCred] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        switch (e.target.id) {
            case "username":
                setCred({ username: e.target.value, password: cred.password });
                setCurrentMember(e.target.value);
                break;
            case "password":
                setCred({ username: cred.username, password: e.target.value });
                break;
            default:
                console.error('Idk wtf happened, this should never happen. Burn everything. No witnesses.');
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
                <button>Let's go!</button>
            </form>
        </div>
    );
}
import './Header.css';
// import { useNavigate } from 'react-router-dom';

function Header({ setValidated, setList, setCurrentMember }) {
    // const navigate = useNavigate();

    const mainNav = () => {
        // navigate('/');
        setCurrentMember('');
        setList("");
        setValidated(false);
    }

    return (
        <div id="header">
            <button id="header-button" onClick={() => mainNav()}>Gift Ideas</button>
        </div>
    );
}

export default Header;

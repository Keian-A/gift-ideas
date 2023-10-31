import './Header.css';

function Header({ setValidated, setList, setCurrentMember }) {

    const mainNav = () => {
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

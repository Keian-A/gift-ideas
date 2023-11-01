import { Stack, Button } from '@mui/material';
import './Header.css';

function Header({ setValidated, setList, setCurrentMember, list }) {

    const mainNav = () => {
        setCurrentMember('');
        setList("");
        setValidated(false);
    }

    return (
        <div id="header">
            <h2 id="title">Gift Ideas</h2>
            <div id="nav-bar">
                {list ? (
                    <Stack>
                        <Button variant="outlined" onClick={() => mainNav()}>Sign Out</Button>
                    </Stack>
                ) : null}
            </div>
        </div>
    );
}

export default Header;

import axios from 'axios';
import { Stack, Button } from '@mui/material';
import './Header.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Header({ currentMember, setValidated, setList, setCurrentMember, list }) {

    const mainNav = () => {
        setCurrentMember('');
        setList("");
        setValidated(false);
    }

    const removePersonalBought = async () => {
        try {
            let giftObj = {username: currentMember};
            let {data} = await axios.post(`${SERVER_URL}/deleteMyBoughtGifts`, giftObj);
            setList(data);
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div id="header">
            <h2 id="title">Gift Ideas</h2>
            <div id="nav-bar">
                {list ? (
                    <Stack id="nav-links">
                        <Button variant="outlined" onClick={() => removePersonalBought()}>Remove All My Bought Items</Button>
                        <Button variant="outlined" onClick={() => mainNav()}>Sign Out</Button>
                    </Stack>
                ) : null}
            </div>
        </div>
    );
}

export default Header;

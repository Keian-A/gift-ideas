import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Drawer, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

export default function TemporaryDrawer() {
    const [memberArr, setMemberArr] = useState([]);
    // The spoilers variable is created so if someone who clicks on a name will see the gift info for that person, if a gift was bought or not
    const [spoilers, setSpoilers] = useState(false);

    useEffect(() => {
        fetchFamilyData();
    }, [])

    async function fetchFamilyData() {
        axios.get(`${process.env.REACT_APP_SERVER}/members`).then((data) => {
            console.log(data.data);
            setMemberArr(data.data);
        });
    }

    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {memberArr.map((item, idx) => (
                    <ListItem key={idx} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div id="home">
            {["Add to list", "Buy a gift"].map((anchor, idx) => (
                <div key={idx}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </div>
            ))}
        </div>
    );
}

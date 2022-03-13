import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

export type HeaderProps = {
    onMenuClick?: () => void;
};

export default function Header(props: HeaderProps) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={props.onMenuClick}
                >
                    <Avatar />
                </IconButton>
                <Typography variant="h6" component="div" noWrap sx={{ mr: 2 }}>
                    MONTREK
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton edge="end"></IconButton>
            </Toolbar>
        </AppBar>
    );
}

Header.defaultProps = {
    onMenuClick: () => {},
};

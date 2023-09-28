import { AppBar, Box, Button, Container, Stack, Toolbar } from '@mui/material';
import './Header.css'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { SetUserContext, UserContext } from '../restaurantContext/Context';
import RestaurantSearch from '../restaurantSrearch/ReasurantSrearch';


const pages = ['Home']
const settings = ['Profile', 'Logout'];
const pageMapping = {
    Home: '/',
}


const Header = () => {

    const navigate = useNavigate()
    const user = React.useContext(UserContext)
    const setUser = React.useContext(SetUserContext)

    // const handlePageClick = (pageName) => {
    //     navigate(pageMapping[pageName])
    // }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenuAndNavigate = (e, pageName) => {
        if (pageName){
            navigate(`/`)
        }
        setAnchorElNav(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleCloseNavUserMenu = (e, setting) => {
        if (setting){
            if (setting.toLowerCase() === 'logout') {
                localStorage.clear('token')
                setUser({user: null})
            }else{
                navigate(`/${setting.toLowerCase()}`)
        }}
        setAnchorElUser(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }



    return(
        <>
            <AppBar position="static" style={{backgroundColor: 'rgb(255, 211, 51)'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <RestaurantIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', xl: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        My App
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={(e) => handleCloseNavMenuAndNavigate(e, page)}>
                            <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        My App
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={(e) => handleCloseNavMenuAndNavigate(e, page)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>
                    {user.user ?
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user?.user?.username} src={user?.user?.img_url} />
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {user?.user?.is_staff &&
                        <MenuItem  onClick={() => navigate('/add-restaurant')}>
                        <Typography textAlign="center" m={'3px'}>Add Restaurant</Typography>
                        </MenuItem>
                            }
                        
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={(e) => handleCloseNavUserMenu(e, setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
 
                    </Box>
                    :
                    <>
                        <Button onClick={() => navigate('/login')}>Login</Button>
                        <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                    </>
                    }
                    </Toolbar>
                </Container>
                </AppBar>
        </>
            
    )
}


export default Header




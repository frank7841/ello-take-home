import { Box, AppBar, Toolbar, Typography, IconButton, Drawer,List,ListItem,ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const navLinks=[
    {
        name:"Home",
        link:"/",
    },
    {
        name:"Reading List",
        link:"/",
    }
]
const  Navbar =()=> {
    const {pathname} =useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };
  return (
    <>
        <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" , color:"#335C6E" }}>
            <Toolbar sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'space-between' }}>
                <Typography variant="h6" noWrap component="div">
                        MyApp
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Toolbar sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'row', alignItems: 'center' }}>
                    {navLinks.map((nav, index) => (
                        <Typography
                            key={index}
                            variant="h6"
                            component="div"
                            sx={{ padding: 1 }}
                        >
                            {nav.name}
                        </Typography>
                    ))}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ display: { xs: 'block', lg: 'none' }}}
            > 
                <Box
                    sx={{ width: 250, }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {navLinks.map((nav, index) => (
                            <ListItem button key={index}>
                                <ListItemText primary={nav.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
          </Drawer>     
    </>
  )
}

export default Navbar
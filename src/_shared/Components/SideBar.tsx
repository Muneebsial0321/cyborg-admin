// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { Link } from 'react-router-dom';
// import routes from '../../routes/routes';
// import { Menu } from '@mui/icons-material';
// import { AppBar, Button } from '@mui/material';

// export default function SideBar() {
//     const [open, setOpen] = React.useState(false);

//     const toggleDrawer = (newOpen: boolean) => () => {
//         setOpen(newOpen);
//     };

//     const DrawerList = (
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//             <List>
//                 {routes.map((e, i) => (
//                     <Link to={e.path} key={i}>
//                         <ListItem key={e.name} disablePadding>
//                             <ListItemButton>
//                                 <ListItemText primary={e.name} />
//                             </ListItemButton>
//                         </ListItem>
//                     </Link>
//                 ))}
//             </List>
//         </Box>
//     );

//     return (
//         <Box>

//         <AppBar
//             elevation={9}
//             className='bg-black relative py-3 flex justify-start'
//         >
//             <Button className='w-[5rem]' onClick={() => setOpen(true)}>
//                 <Menu className='text-3xl text-white' />
//             </Button>

//             <Drawer 
//             variant='persistent'
//             open={open} onClose={toggleDrawer(false)}>
//                 {DrawerList}
//             </Drawer>
//         </AppBar>
//         <div className="w-full h-[100vh] bg-amber-600">
//             k
//         </div>
//         </Box>

//     );
// }
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import routes from '../../routes/routes';
import { Link } from 'react-router-dom';
import { HomeFilled } from '@mui/icons-material';

const drawerWidth = 230;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function PersistentDrawerLeft({children}:{children:React.ReactNode}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const DrawerList = (
    <Box sx={{ width: 220 }} role="presentation">
        <List>
            {routes.map((e, i) => (
                <Link to={e.path} key={i}>
                    <ListItem key={e.name} disablePadding>
                        <ListItemButton className='flex justify-center items-center gap-4'>
                           <>{e.icon}</> <ListItemText className='text-lg' primary={e.name} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}
        </List>
    </Box>
);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
      className='bg-black'
      position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
      className=''
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
        className='bg-black'
        >
          <div className="w-full">
            <HomeFilled className='text-white text-4xl'/>
          </div>
         <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon className='text-white' /> : <ChevronRightIcon className='text-white' />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {DrawerList}
        <Divider />

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          {children}
      </Main>
    </Box>
  );
}

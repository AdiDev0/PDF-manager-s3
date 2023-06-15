import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, InputAdornment, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

const Navbar = ({setSearchString, token, setToken}) => {
  const history = useHistory();

  const handleLogin = () => {
    history.push('/auth')
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log('Search:', e.target.search.value);
  };


  const handleChange = (e)=>{
    console.log(e.target.value)
    setSearchString(e.target.value)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ marginRight: '2rem' }}>
            MY PDFs
          </Typography>
        </div>
        <form onSubmit={handleSearch} >
          <TextField
            name="search"
            type="search"
            variant="outlined"
            placeholder="Search..."
            size="small"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" sx={{ padding: '8px' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ marginRight: '2rem' }}
          />
        </form>
        {token && <Avatar sx={{color:'#1976D2', backgroundColor:'white', margin:'1rem 1rem'}}>{jwt_decode(token)?.name.charAt(0)}</Avatar>}
        <div>
          {!token && <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>}
          {token && <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;



// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, TextField, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const Navbar = () => {
//   const handleLogin = () => {
//     // Perform login logic
//     console.log('Logged in');
//   };

//   const handleLogout = () => {
//     // Perform logout logic
//     console.log('Logged out');
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Perform search logic
//     console.log('Search:', e.target.search.value);
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <div style={{ flexGrow: 1 }}>
//           <Typography variant="h6" component="div" sx={{ marginRight: '2rem' }}>
//             Home
//           </Typography>
//           <Typography variant="h6" component="div">
//             Contact
//           </Typography>
//         </div>
//         <form onSubmit={handleSearch}>
//         <IconButton type="submit" sx={{ padding: '8px' }}>
//             <SearchIcon />
//           </IconButton>
//           <TextField
//             name="search"
//             type="search"
//             variant="outlined"
//             placeholder="Search..."
//             size="small"
//             sx={{ marginRight: '2rem' }}
//           />
//         </form>
//         <div>
//           <Button color="inherit" onClick={handleLogin}>
//             Login
//           </Button>
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

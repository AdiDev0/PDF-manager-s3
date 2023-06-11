import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = ({setSearchString}) => {
  const handleLogin = () => {
    // Perform login logic
    console.log('Logged in');
  };

  const handleLogout = () => {
    // Perform logout logic
    console.log('Logged out');
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
        <div>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
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

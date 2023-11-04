import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchTags, fetchWishlist } from 'apis';
import Cookies from 'js-cookie';
import RegisterLayout from 'components/RegisterLayout';
import SignInLayout from 'components/SignInLayout';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

function ResponsiveAppBar(props) {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true');
  const [username] = useState(localStorage.getItem('username') || '-');

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const [wishlistItemCount, setWishlistItemCount] = useState(0);

  const navigate = useNavigate();

  const handleSearchBySkillsets = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.skillsetId);
    props.onSearchBySkillsets(selectedIds);
  };

  const handleOpenDialog = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseDialog = () => {
    setIsRegisterOpen(false);
  };

  const handleOpenDialogSignIn = () => {
    setIsSignInOpen(true);
  };

  const handleCloseDialogSignIn = () => {
    setIsSignInOpen(false);
  };

  const handleSignInHereClick = () => {
    handleCloseDialog(); // Close the RegisterLayout dialog
    handleOpenDialogSignIn(); // Open the SignInLayout dialog
  };

  const handleRegisterHereClick = () => {
    handleCloseDialogSignIn();
    handleOpenDialog();
  };

  const handleLoginSuccess = () => {
    setIsLogin(true);
  };

  const navigateToWishlist = () => {
    navigate('/wishlist');
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin') === 'true');
    const fetchData = async () => {
      try {
        const response = await fetchTags(inputValue);
        setList(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isLogin) {
      const userId = localStorage.getItem('userId');
      fetchWishlist(userId)
        .then((response) => {
          setWishlistItemCount(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    if (inputValue) {
      fetchData();
    } else {
      setList([]);
    }
  }, [inputValue, isLogin]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToMyRequest = () => {
    navigate('/my-request');
  };

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    localStorage.removeItem('isLogin');
    Cookies.remove('jwtToken');

    navigate('/home');
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: '#081E43', width: '100%' }}>
      <Container maxWidth="">
        <Toolbar disableGutters sx={{ height: { md: '100px', xs: '66px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
            }}
          >
            <a href="/">
              <Avatar
                src={process.env.PUBLIC_URL + '/resource/image/logotujuhsembilan.svg'}
                alt="Talent Center 79 Logo"
                sx={{
                  width: { xs: '38px', md: '60px' },
                  height: 'auto',
                  borderRadius: 0,
                  display: 'flex',
                }}
              />
            </a>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/main"
              sx={{
                mr: 2,
                fontFamily: 'Poppins',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                lineHeight: '80px',
                textDecoration: 'none',
                '@media (max-width: 600px)': {
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '.0rem',
                },
              }}
            >
              Talent Center 79
            </Typography>
          </Box>
          {/* search box */}

          <Paper
            component="form"
            sx={{
              width: '900px',
              height: '51px',
              backgroundColor: 'white',
              borderRadius: '10px',
              posision: 'absolute',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Autocomplete
              multiple
              inputValue={inputValue}
              data-testid="search-bar-element"
              id="tags-standard"
              options={list}
              getOptionLabel={(option) => option.skillsetName}
              onChange={(event, newValue) => {
                setSelectedOptions(newValue); // Mengatur nilai terpilih saat opsi dipilih atau dihapus
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                setSelectedOptions([]); // Mengatur nilai terpilih menjadi kosong saat input berubah
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                  variant="standard"
                  placeholder={selectedOptions.length === 0 ? 'Try "JavaScript"' : ''}
                  sx={{
                    width: '790px',
                    ml: 4,
                    flex: 1,
                    color: 'black',
                    '& .MuiAutocomplete-endAdornment': {
                      display: 'none', // Hide the dropdown icon
                    },
                    '@media (max-width: 600px)': {
                      width: '245px',
                    },
                    // Vertically center the Autocomplete
                    position: 'relative',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
            />
            <IconButton
              type="button"
              sx={{
                // mr: 3,
                color: '#C4C4C4',
              }}
              aria-label="search"
              onClick={() => {
                handleSearchBySkillsets(selectedOptions);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          {isLogin ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                }}
              >
                <IconButton
                  data-testid="my-wishlist-icon-button"
                  sx={{
                    // position: 'absolute',
                    // right: 310,
                    color: 'white',
                    '@media (max-width: 600px)': {
                      // right: 106,
                    },
                  }}
                >
                  <Badge badgeContent={wishlistItemCount} color="error" invisible={false}>
                    <BookmarkIcon onClick={navigateToWishlist} />
                  </Badge>
                </IconButton>

                <NotificationsIcon
                  sx={{
                    // position: 'absolute',
                    // right: 270,
                    '@media (max-width: 600px)': {
                      // right: 65,
                    },
                  }}
                />
                <Divider
                  sx={{
                    color: 'white',
                    height: 28,
                    m: 0.5,
                    display: { xs: 'none', md: 'block' },
                    borderLeft: '1px solid',
                  }}
                  orientation="vertical"
                />

                <AccountCircleIcon sx={{ fontSize: '2rem' }} />
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    display: { xs: 'none', md: 'flex' },
                  }}
                >
                  {username}
                </Typography>
                <ArrowDropDownIcon
                  data-testid="navbar-user-dropdown"
                  aria-controls="dropdown-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                  }}
                />
                <Menu id="dropdown-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '17px',
                      textAlign: 'left',
                    }}
                    onClick={navigateToMyRequest}
                  >
                    <ListItemIcon>
                      <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    My Request
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '17px',
                      textAlign: 'left',
                    }}
                    onClick={handleSignOut}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Sign Out
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Button
                onClick={handleOpenDialog}
                variant="text"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontSize: '14px',
                  fontFamily: 'inter',
                  position: 'absolute',
                  right: 110,
                  textTransform: 'none',
                  marginRight: '10px',
                  color: 'white',
                  borderColor: 'white',
                }}
              >
                Register
              </Button>
              <RegisterLayout open={isRegisterOpen} onClose={handleCloseDialog} onSignInClick={handleSignInHereClick} />
              <Button
                onClick={handleOpenDialogSignIn}
                variant="outlined"
                sx={{
                  fontSize: '14px',
                  fontFamily: 'inter',
                  borderRadius: '20px',
                  display: { xs: 'none', md: 'flex' },
                  position: 'absolute',
                  right: 20,
                  textTransform: 'none',
                  marginRight: '10px',
                  color: 'white',
                  borderColor: 'white',
                }}
              >
                Sign In
              </Button>
              <SignInLayout open={isSignInOpen} onClose={handleCloseDialogSignIn} onRegisterClick={handleRegisterHereClick} onLoginSuccess={handleLoginSuccess}/>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

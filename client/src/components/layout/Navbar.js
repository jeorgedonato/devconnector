import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	btText: {
		textTransform: 'inherit'
	},
	navBar: {
		display: 'block'
	},
	colorTextW: {
		color: '#fff'
	},
	menuBg: {
		backgroundColor: 'var(--dark-color)'
	}
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	let classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const authLinks = (
		<Fragment>
			<Box component='span' display={{ xs: 'none', md: 'block' }} m={1}>
				{/* <Typography variant='h6' className={classes.title}> */}
				<Button
					onClick={logout}
					color='inherit'
					className={classes.btText}
					startIcon={<ExitToApp />}
				>
					Logout
				</Button>
				{/* </Typography> */}
			</Box>
			<Box
				component='span'
				display={{ xs: 'block', md: 'none' }}
				m={1}
				style={{ marginRight: '-16px' }}
			>
				<IconButton
					edge='start'
					className={classes.menuButton}
					color='inherit'
					aria-label='more-menu'
					aria-haspopup='true'
					onClick={handleClick}
				>
					<MenuIcon />
				</IconButton>
				<Menu
					id='more-menu'
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
					classes={{ paper: classes.menuBg }}
				>
					<MenuItem onClick={logout}>
						<ExitToApp className={classes.colorTextW} />
						<Typography className={classes.colorTextW}>Logout</Typography>
					</MenuItem>
				</Menu>
			</Box>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Box component='span' display={{ xs: 'none', md: 'block' }} m={1}>
				<Button
					component={Link}
					to='/!#'
					color='inherit'
					className={classes.btText}
				>
					Developers
				</Button>
				<Button
					component={Link}
					to='/register'
					color='inherit'
					className={classes.btText}
				>
					Register
				</Button>
				<Button
					component={Link}
					to='/login'
					color='inherit'
					className={classes.btText}
				>
					Login
				</Button>
			</Box>
			<Box
				component='span'
				display={{ xs: 'block', md: 'none' }}
				m={1}
				style={{
					marginRight: '-16px'
				}}
			>
				<IconButton
					edge='start'
					className={classes.menuButton}
					color='inherit'
					aria-label='more-menu'
					aria-haspopup='true'
					onClick={handleClick}
				>
					<MenuIcon />
				</IconButton>
				<Menu
					id='more-menu'
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
					classes={{ paper: classes.menuBg }}
				>
					<MenuItem onClick={handleClose}>
						<Link to='!#' className={classes.colorTextW}>
							Developers
						</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link to='/register' className={classes.colorTextW}>
							Register
						</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link to='/login' className={classes.colorTextW}>
							Login
						</Link>
					</MenuItem>
				</Menu>
			</Box>
		</Fragment>
	);

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar className='bg-dark'>
					<Typography variant='h6' className={classes.title}>
						<Button
							component={Link}
							to='/'
							color='inherit'
							className={classes.btText}
							startIcon={<CodeIcon />}
						>
							DevConnector
						</Button>
					</Typography>
					{!loading && (
						<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

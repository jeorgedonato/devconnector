import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import BgImage from '../../images/showcase.jpg';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
		background: `url(${BgImage}) no-repeat center center/cover`,
		height: `100vh`,
		position: 'relative'
	},
	landingInner: {
		color: `#fff`,
		height: '85%',
		width: '80%',
		margin: 'auto',
		display: 'flex',
		flexDirection: `column`,
		alignItems: `center`,
		justifyContent: `center`,
		textAlign: `center`
	},
	darkOverlay: {
		backgroundColor: `rgba(0, 0, 0, 0.7)`,
		position: `absolute`,
		top: `0`,
		left: `0`,
		width: `100%`,
		height: `100%`
	},
	buttons: {
		textTransform: 'inherit'
	}
}));

const Landing = () => {
	let classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth='xl' className={classes.root}>
				<Typography component='div' className={classes.darkOverlay}>
					<Typography component='div' className={classes.landingInner}>
						<Typography variant='h2' component='h2'>
							Developer Connector
						</Typography>
						<Typography variant='h6' component='h6'>
							Create a developer profile/portfolio, share posts and get help
							from other developers
						</Typography>
						<Box component='div'>
							<Button
								variant='contained'
								color='primary'
								component={Link}
								to='/register'
								className={classes.buttons}
								style={{ marginRight: '10px' }}
							>
								Sign Up
							</Button>
							<Button
								className={classes.buttons}
								variant='contained'
								component={Link}
								to='/login'
							>
								Login
							</Button>
						</Box>
					</Typography>
				</Typography>
			</Container>
		</React.Fragment>
	);
};

export default Landing;

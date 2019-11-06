import React, { Fragment, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white
		}
	},
	root: {
		flexGrow: 1
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column'
	}
}));

const Register = () => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		cpassword: ''
	});

	return (
		<Fragment>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5' color='textPrimary'>
					Register
				</Typography>
				<p style={{ display: 'flex' }}>
					<Icon fontSize='small'>person</Icon>
					<Typography component='span' variant='body1'>
						Create your account
					</Typography>
				</p>
				<form className={classes.form}></form>
			</div>
		</Fragment>
	);
};

export default Register;

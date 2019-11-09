import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

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
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	}
}));

const Login = () => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		showPassword: false
	});

	const { email, password, showPassword } = formData;

	const handleClickShowPassword = () => {
		setFormData({ ...formData, showPassword: !formData.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	const onChange = prop => e => {
		setFormData({ ...formData, [prop]: e.target.value });
	};

	const onSubmit = e => {
		console.log(formData);
	};

	return (
		<Fragment>
			<CssBaseline />
			<div className={classes.paper}>
				<Container maxWidth='sm'>
					<div style={{ display: 'block' }}>
						<Typography component='h1' variant='h5' color='textPrimary'>
							Login
						</Typography>
						<Typography component='p' style={{ display: 'flex' }}>
							<Icon fontSize='small'>person</Icon>
							<Typography component='span' variant='body1'>
								Sign In to your account
							</Typography>
						</Typography>
					</div>

					<form className={classes.form} onSubmit={e => onSubmit(e)}>
						<FormControl
							className={clsx(classes.margin, classes.textField)}
							fullWidth
							required
							margin='dense'
						>
							<InputLabel htmlFor='email-input'>Email</InputLabel>
							<Input
								id='email-input'
								type='email'
								onChange={onChange('email')}
								value={email}
							/>
						</FormControl>

						<FormControl
							className={clsx(classes.margin, classes.textField)}
							fullWidth
							required
							margin='dense'
						>
							<InputLabel htmlFor='password-input'>Password</InputLabel>
							<Input
								id='password-input'
								type={showPassword ? 'text' : 'password'}
								onChange={onChange('password')}
								value={password}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<Button variant='contained' color='primary' type='submit'>
							Sign In
						</Button>
					</form>
					<Typography component='p' variant='subtitle1'>
						Don't have an account? <Link to='/register'>Register</Link>
					</Typography>
				</Container>
			</div>
		</Fragment>
	);
};

export default Login;

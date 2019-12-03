import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { setAlert } from '../../actions/alert';
import { Button } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

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
	},
	container: {
		marginTop: '50px'
	}
}));

const CreateProfile = ({
	isAuthenticated,
	setAlert,
	createProfile,
	history
}) => {
	const classes = useStyles();

	// const [showList, setShowList] = useState(false);

	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: ''
		// selectedSkills: []
	});

	const [showSocial, setShowSocial] = useState(false);

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
		// selectedSkills
	} = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	// console.log(formData);

	const onSubmit = e => {
		e.preventDefault();

		createProfile(formData, history);
		// if (password !== cpassword) {
		// 	// setFormData({ ...formData, password: '', cpassword: '' });
		// 	// setAlert('Passwords don`t match ', 'error');
		// } else {
		// 	// register({ name, email, password });
		// }
	};

	return (
		<Fragment>
			<div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
				<div style={{ display: 'block' }}>
					<Typography component='h1' variant='h5' color='textPrimary'>
						Create Your Profile
					</Typography>
					<Typography component='p' style={{ display: 'flex' }}>
						<Icon fontSize='small'>person_outline</Icon>
						<Typography component='span' variant='body1'>
							Let's get some information to make your profile stand out
						</Typography>
					</Typography>
				</div>

				<form className={classes.form} onSubmit={e => onSubmit(e)}>
					<FormControl
						fullWidth
						className={clsx(
							classes.margin,
							classes.textField,
							classes.formControl
						)}
						required
					>
						<InputLabel shrink id='profile-status-label'>
							Professional Status
						</InputLabel>
						<Select
							labelId='profile-status-label'
							id='profile-status'
							value={status}
							onChange={e => onChange(e)}
							displayEmpty
							name='status'
							// className={classes.selectEmpty}
						>
							<MenuItem value=''>
								<em>Please select</em>
							</MenuItem>
							<MenuItem value={'Software Engineer'}>Software Engineer</MenuItem>
							<MenuItem value={'Software Developer'}>
								Software Developer
							</MenuItem>
							<MenuItem value={'Junior Developer'}>Junior Developer</MenuItem>
							<MenuItem value={'Senior Developer'}>Senior Developer</MenuItem>
							<MenuItem value={'Manager'}>Manager</MenuItem>
							<MenuItem value={'Student or Learner'}>
								Student or Learner
							</MenuItem>
							<MenuItem value={'Instructor or Teacher'}>
								Instructor or Teacher
							</MenuItem>
							<MenuItem value={'Intern'}>Intern</MenuItem>
							<MenuItem value={'Other'}>Other</MenuItem>
						</Select>
						<FormHelperText>
							Give us an idea of where you are at in your career
						</FormHelperText>
					</FormControl>
					<FormControl
						fullWidth
						className={clsx(
							classes.margin,
							classes.textField,
							classes.formControl
						)}
					>
						<TextField
							id='company-input'
							label='Company'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={company}
							name='company'
						/>
						<FormHelperText>
							Could be your own company or one you work for
						</FormHelperText>
					</FormControl>
					<FormControl
						fullWidth
						className={clsx(
							classes.margin,
							classes.textField,
							classes.formControl
						)}
					>
						<TextField
							id='website-input'
							label='Website'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={website}
							name='website'
						/>
						<FormHelperText>
							Could be your own or a company website
						</FormHelperText>
					</FormControl>
					<FormControl
						fullWidth
						className={clsx(
							classes.margin,
							classes.textField,
							classes.formControl
						)}
					>
						<TextField
							id='location-input'
							label='Location'
							fullWidth
							onChange={e => onChange(e)}
							name='location'
							margin='dense'
							value={location}
						/>
						<FormHelperText>
							City & state suggested (eg. Boston, MA)
						</FormHelperText>
					</FormControl>
					<FormControl
						fullWidth
						required
						className={clsx(
							classes.margin,
							classes.textField,
							classes.formControl
						)}
					>
						<TextField
							id='skills-input'
							label='Skills *'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={skills}
							name='skills'
						/>
						<FormHelperText>
							Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
						</FormHelperText>
					</FormControl>
					<FormControl
						fullWidth
						className={clsx(
							classes.margin,
							classes.textField,
							classes.formControl
						)}
					>
						<TextField
							id='githubusername-input'
							label='Github Username URL'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={githubusername}
							name='githubusername'
						/>
					</FormControl>
					<TextField
						id='standard-multiline-flexible'
						label='Tell us about yourself'
						multiline
						rowsMax='4'
						value={bio}
						onChange={e => onChange(e)}
						className={classes.textField}
						margin='dense'
						name='bio'
						fullWidth
					/>
					<Typography style={{ marginBottom: '5px' }}>
						<Button
							startIcon={<Icon>add</Icon>}
							onClick={() => setShowSocial(!showSocial)}
						>
							Add Social Media Links
						</Button>
					</Typography>

					{showSocial && (
						<Fragment>
							<FormControl
								fullWidth
								className={clsx(
									classes.margin,
									classes.textField,
									classes.formControl
								)}
							>
								<TextField
									id='twitter-input'
									label='Twitter URL'
									fullWidth
									onChange={e => onChange(e)}
									margin='dense'
									value={twitter}
									name='twitter'
								/>
							</FormControl>
							<FormControl
								fullWidth
								className={clsx(
									classes.margin,
									classes.textField,
									classes.formControl
								)}
							>
								<TextField
									id='facebook-input'
									label='Facebook URL'
									fullWidth
									onChange={e => onChange(e)}
									margin='dense'
									value={facebook}
									name='facebook'
								/>
							</FormControl>
							<FormControl
								fullWidth
								className={clsx(
									classes.margin,
									classes.textField,
									classes.formControl
								)}
							>
								<TextField
									id='linkedin-input'
									label='Linkedin URL'
									fullWidth
									onChange={e => onChange(e)}
									margin='dense'
									value={linkedin}
									name='linkedin'
								/>
							</FormControl>
							<FormControl
								fullWidth
								className={clsx(
									classes.margin,
									classes.textField,
									classes.formControl
								)}
							>
								<TextField
									id='youtube-input'
									label='Youtube URL'
									fullWidth
									onChange={e => onChange(e)}
									margin='dense'
									value={youtube}
									name='youtube'
								/>
							</FormControl>
							<FormControl
								fullWidth
								className={clsx(
									classes.margin,
									classes.textField,
									classes.formControl
								)}
							>
								<TextField
									id='instagram-input'
									label='Instagram URL'
									fullWidth
									onChange={e => onChange(e)}
									margin='dense'
									value={instagram}
									name='instagram'
								/>
							</FormControl>
						</Fragment>
					)}
					<Button
						startIcon={<Icon>add</Icon>}
						variant='contained'
						color='primary'
						type='submit'
						style={{ marginRight: '2px' }}
					>
						Create
					</Button>

					<Button
						component={Link}
						to='/dashboard'
						startIcon={<Icon>arrow_back</Icon>}
					>
						Go Back
					</Button>
				</form>
			</div>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	isAuthenticated: PropTypes.bool,
	setAlert: PropTypes.func.isRequired,
	createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { createProfile, setAlert })(
	withRouter(CreateProfile)
);

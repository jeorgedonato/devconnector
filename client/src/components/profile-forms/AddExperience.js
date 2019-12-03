import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const AddExperience = ({ addExperience, history }) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();

		addExperience(formData, history);
	};

	return (
		<Fragment>
			<div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
				<div style={{ display: 'block' }}>
					<Typography component='h1' variant='h5' color='textPrimary'>
						Add Experience
					</Typography>
					<Typography component='p' style={{ display: 'flex' }}>
						<Icon fontSize='small'>job</Icon>
						<Typography component='span' variant='body1'>
							Add any developer/programming positions that you have had in the
							past
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
					>
						<TextField
							id='title-input'
							label='Job Title'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={title}
							name='title'
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
							id='company-input'
							label='Company'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={company}
							name='company'
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
							id='location-input'
							label='Location'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={location}
							name='location'
						/>
					</FormControl>

					<TextField
						id='from-input'
						label='From Date'
						fullWidth
						onChange={e => onChange(e)}
						margin='dense'
						value={from}
						name='from'
						type='month'
						required
						InputLabelProps={{
							shrink: true
						}}
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={current}
								value={current}
								color='primary'
								onChange={() => {
									setFormData({ ...formData, current: !current });
									toggleDisabled(!toDateDisabled);
								}}
							/>
						}
						label='Current Job'
					/>

					<TextField
						id='to-input'
						label='To Date'
						fullWidth
						onChange={e => onChange(e)}
						margin='dense'
						value={to}
						name='to'
						type='month'
						disabled={toDateDisabled ? 'disabled' : ''}
						InputLabelProps={{
							shrink: true
						}}
					/>

					<TextField
						id='standard-multiline-flexible'
						label='Tell us about your job'
						multiline
						rowsMax='4'
						value={description}
						onChange={e => onChange(e)}
						className={classes.textField}
						margin='dense'
						name='description'
						fullWidth
					/>

					<Button
						startIcon={<Icon>add</Icon>}
						variant='contained'
						color='primary'
						type='submit'
						style={{ marginRight: '2px' }}
					>
						Add
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

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));

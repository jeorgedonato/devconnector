import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
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

const AddEducation = ({ addEducation, history }) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
	} = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();

		addEducation(formData, history);
	};

	return (
		<Fragment>
			<div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
				<div style={{ display: 'block' }}>
					<Typography component='h1' variant='h5' color='textPrimary'>
						Add Education
					</Typography>
					<Typography component='p' style={{ display: 'flex' }}>
						<Icon fontSize='small'>school</Icon>
						<Typography component='span' variant='body1'>
							Add any school, bootcamp, etc that you have attended
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
							id='school-input'
							label='School'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={school}
							name='school'
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
							id='degree-input'
							label='Degree'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={degree}
							name='degree'
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
							id='fieldofstudy-input'
							label='Field of Study'
							fullWidth
							onChange={e => onChange(e)}
							margin='dense'
							value={fieldofstudy}
							name='fieldofstudy'
						/>
					</FormControl>

					<TextField
						id='from-input'
						label='From Date'
						type='month'
						className={classes.textField}
						InputLabelProps={{
							shrink: true
						}}
						margin='dense'
						fullWidth
						value={from}
						name='from'
						onChange={e => onChange(e)}
						required
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
						label='Current School'
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

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));

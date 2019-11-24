import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
	success: {
		backgroundColor: green[600]
	},
	error: {
		backgroundColor: theme.palette.error.dark
	},
	info: {
		backgroundColor: theme.palette.primary.main
	},
	warning: {
		backgroundColor: amber[700]
	},
	icon: {
		fontSize: 20
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1)
	},
	message: {
		display: 'flex',
		alignItems: 'center'
	},
	alertStyle: {
		marginBottom: '-70px',
		marginTop: '75px'
	}
}));

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon
};

const SnackBar = props => {
	const classes = styles();
	const { id, message, variant } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			key={id}
			id={id}
			className={clsx(classes[variant], classes.alertStyle)}
			aria-describedby='client-snackbar'
			message={
				<span id='client-snackbar' className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
		/>
	);
};

SnackBar.propTypes = {
	message: PropTypes.string,
	variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired
};

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map(alert => (
		<SnackBar
			key={alert.id}
			id={alert.id}
			message={alert.msg}
			variant={alert.alertType}
		/>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

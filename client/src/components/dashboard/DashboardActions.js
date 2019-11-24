import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const DashboardActions = () => {
	return (
		<Fragment>
			<Button component={Link} to='/edit-profile' startIcon={<Icon>edit</Icon>}>
				Edit Profile
			</Button>
			<Button
				component={Link}
				to='/add-experience'
				startIcon={<Icon>work</Icon>}
			>
				Add Experience
			</Button>
			<Button
				component={Link}
				to='/add-education'
				startIcon={<Icon>school</Icon>}
			>
				Add Education
			</Button>
		</Fragment>
	);
};

export default DashboardActions;

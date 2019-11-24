import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
				<h1>Dashboard</h1>
				<p>Welcome {user && user.name}</p>
				{profile !== null ? (
					<Fragment>
						<p>You have a profile</p>
					</Fragment>
				) : (
					<Fragment>
						<p>You have not yet setup a profile, please add some info</p>
						<Button
							component={Link}
							to='/create-profile'
							variant='contained'
							color='primary'
						>
							Create Profile
						</Button>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

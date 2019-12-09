import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import DashboardActions from '../dashboard/DashboardActions';
import Experience from '../dashboard/Experience';
import Education from '../dashboard/Education';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
	deleteAccount
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [loading, profile, getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
			<Fragment>
				<div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
					<h1>Dashboard</h1>
					<p>
						<Icon>face</Icon>{' '}Welcome {user && user.name}
					</p>
					{profile !== null || loading ? (
						<Fragment>
							<DashboardActions />
							<Experience experience={profile.experience} />
							<Education education={profile.education} />

							<Button
								style={{ marginTop: '10px' }}
								startIcon={<Icon>delete_forever</Icon>}
								color='secondary'
								onClick={() => deleteAccount()}
							>
								Delete my Account
						</Button>
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
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);

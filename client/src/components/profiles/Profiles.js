import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Icon from '@material-ui/core/Icon';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, getCurrentProfile, profile: { loading, profiles }, history }) => {
	useEffect(() => {
		getProfiles();
		getCurrentProfile();
	}, [getProfiles, getCurrentProfile]);

	return (
		<Fragment>
			{loading ? (
				<Spinner></Spinner>
			) : (
					<Fragment>
						<div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
							<h1>Developers</h1>
							<p>
								<Icon>developer_mode</Icon>{' '}Browse and Connect with Developers
							</p>
							{profiles.length > 0 ? (
								profiles.map(profile => (
									<ProfileItem key={profile._id} profile={profile} />
								))
							) : (
									<>
										<p>No Profile found...</p>
									</>
								)}
						</div>
					</Fragment>
				)}
		</Fragment>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(withRouter(Profiles));

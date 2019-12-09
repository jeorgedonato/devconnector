import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: '100%',

	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	liText: {
		color: blue[800],
		fontSize: '13px'
	}
}));

const ProfileItem = ({ profile, profile: {
	user: { _id, name, avatar },
	status,
	location,
	company,
	skills,
	website,
	githubusername },
	auth,
	history
}) => {
	const classes = useStyles();


	return <Fragment>
		<div>
			<Card className={classes.card} key={_id}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar} src={avatar} alt='User' />
					}
					// action={
					//   <IconButton aria-label="settings">
					//     <MoreVertIcon />
					//   </IconButton>
					// }
					title={name}
					subheader={`${status}` + `${company !== undefined ? ` at ` + company : ''}`}
				/>
				<CardContent>
					<p className='location'>{location && <span>{location}</span>}</p>
					<ul >
						{skills.slice(0, 4).map((skill, index) => (
							<li key={index} className={classes.liText}>
								<Icon>check</Icon>{skill}
							</li>
						))}
					</ul>
				</CardContent>
				<CardActions disableSpacing>
					{auth.isAuthenticated && auth.user._id === _id && profile !== null ? (<Button component={Link} to='/edit-profile' variant="contained" color="primary" startIcon={<Icon>edit</Icon>}>Edit Profile</Button>)
						: (<Button component={Link} to={`/profile/${_id}`} variant="contained" color="primary" startIcon={<Icon>pageview</Icon>}>View Profile</Button>)}

				</CardActions>
			</Card>
		</div>
	</Fragment>;
};

ProfileItem.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(withRouter(ProfileItem));

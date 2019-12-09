import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import Button from '@material-ui/core/Button'


const Profile = ({ match, profile: { profile, loading }, getProfileById, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);



    return (
        <Fragment>
            <div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
                {profile === null || loading ? <Spinner /> :
                    <Fragment>
                        <Button component={Link} to='/developers' variant='contained' color='primary' >Go Back</Button>
                    </Fragment>}
            </div>
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);

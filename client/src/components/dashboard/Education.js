import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
	root: {
		width: '100%',
		marginTop: '15px'
	},
	tableWrapper: {
		maxHeight: 200,
		overflow: 'auto'
	}
});

const Education = ({ education }) => {
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Fragment>
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								<TableCell>School</TableCell>
								<TableCell>Degree</TableCell>
								<TableCell>Years</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{education
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(edu => {
									return (
										<TableRow hover role='checkbox' tabIndex={-1} key={edu._id}>
											<TableCell>{edu.school}</TableCell>
											<TableCell>{edu.degree}</TableCell>
											<TableCell>
												<Moment format='YYYY/MM/DD'>
													{moment.utc(edu.from)}
												</Moment>{' '}
												-{' '}
												{edu.to === null ? (
													' Now'
												) : (
													<Moment format='YYYY/MM/DD'>
														{moment.utc(edu.to)}
													</Moment>
												)}
											</TableCell>
											<TableCell>
												<Button startIcon={<Icon>delete</Icon>}></Button>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={education.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired
};

export default Education;

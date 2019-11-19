import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => (
	<Fragment>
		<CircularProgress
			style={{
				display: 'block',
				margin: 'auto',
				width: '100px',
				height: '100px'
			}}
		/>
	</Fragment>
);

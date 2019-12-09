import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => (
	<Fragment>
		<div style={{ marginTop: '20rem', marginBottom: '3rem' }}>
			<CircularProgress
				style={{
					width: '200px',
					margin: 'auto',
					display: 'block'
				}}
			/>
		</div>
	</Fragment>
);

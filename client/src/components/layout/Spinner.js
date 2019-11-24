import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => (
	<Fragment>
		<div style={{ textAlign: 'center' }}>
			<CircularProgress
				style={{
					display: 'block',
					// margin: '60px 0px 20px 0px',
					width: '200px',
					height: '200px'
				}}
			/>
		</div>
	</Fragment>
);

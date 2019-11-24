import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => (
	<Fragment>
		<div style={{ textAlign: 'center' }}>
			<CircularProgress
				style={{
					display: 'block',
					// margin: '250px 0px 20px 250px',
					width: '160px',
					height: '160px'
					// top: '-50px'
				}}
			/>
		</div>
	</Fragment>
);

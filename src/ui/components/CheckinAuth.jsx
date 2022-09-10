import { Grid } from '@mui/material';
import { Spinner } from '../../components/Spinner';

export const CheckinAuth = () => {
	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}>
			<Grid
				container
				item
				direction='row'
				justifyContent='center'>
				<Spinner />
			</Grid>
		</Grid>
	);
};

import { Navigate, Route, Routes } from 'react-router-dom';

import { useCheckAuth } from '../hooks';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckinAuth } from '../ui';

export const AppRouter = () => {
	const { status } = useCheckAuth();

	if (status === 'checking') {
		return <CheckinAuth />;
	}

	return (
		<Routes>
			{status === 'authenticated' ? (
				<Route
					path='/*'
					element={<JournalRoutes />}
				/>
			) : (
				<Route
					path='/auth/*'
					element={<AuthRoutes />}
				/>
			)}

			<Route
				path='/*'
				element={<Navigate to='/auth/login' />}
			/>
		</Routes>
	);
};

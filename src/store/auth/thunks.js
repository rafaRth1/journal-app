import {
	signInWithGoogle,
	registerUserWithEmailPassword,
	loginWithEmailPassword,
	logoutFirebase,
} from '../../firebase/providers';
import { checkingCredentials, logout, login } from './';

export const checkingAuthentication = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		console.log(email, password);
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const result = await signInWithGoogle();

		if (!result.ok) return dispatch(logout(result.errorMessage));

		dispatch(login(result));
	};
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

		if (!ok) return dispatch(logout({ errorMessage }));

		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLoginWithEmailPassword = ({ email, password }) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const { ok, displayName, photoURL, uid, errorMessage } = await loginWithEmailPassword({
			email,
			password,
		});

		if (!ok) return dispatch(logout({ errorMessage }));

		dispatch(login({ uid, displayName, email, photoURL, errorMessage }));
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		await logoutFirebase();
		dispatch(logout({}));
	};
};

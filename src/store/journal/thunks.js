import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/laodNotes';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from './';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());

		const { uid } = getState().auth;

		// uid
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		const newDoc = doc(collection(FirebaseDB, `/${uid}/journal/notas`));
		await setDoc(newDoc, newNote);

		newNote.id = newDoc.id;

		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		if (!uid) throw new Error('EL UID del usuario no existe');

		const notes = await loadNotes(uid);

		dispatch(setNotes(notes));
	};
};

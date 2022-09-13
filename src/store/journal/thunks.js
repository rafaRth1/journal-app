import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers';
import { loadNotes } from '../../helpers/laodNotes';

import {
	addNewEmptyNote,
	setActiveNote,
	savingNewNote,
	setNotes,
	setSaving,
	updateNote,
	setPhotosToActiveNote,
	deleteNoteById,
} from './';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());

		const { uid } = getState().auth;

		// uid
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
			imageUrls: [],
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

export const startSaveNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());

		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const noteToFireStore = { ...note };
		delete noteToFireStore.id;

		const docRef = doc(FirebaseDB, `/${uid}/journal/notas/${note.id}`);
		await setDoc(docRef, noteToFireStore, { merge: true });

		dispatch(updateNote(note));
	};
};

export const startUploadingFiles = (files = []) => {
	return async (dispatch) => {
		dispatch(setSaving());

		const fileUploadPromies = [];
		for (const file of files) {
			fileUploadPromies.push(fileUpload(file));
		}

		const photosUrls = await Promise.all(fileUploadPromies);
		console.log(photosUrls);

		dispatch(setPhotosToActiveNote(photosUrls));
	};
};

export const startDeleteNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);
		await deleteDoc(docRef);

		dispatch(deleteNoteById(note.id));
	};
};

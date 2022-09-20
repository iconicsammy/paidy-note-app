/*

    Middleware service classes that connect UI to local database or networking.
    
*/

import Logger from "application/Analytics/Logger";
import NotesDatabase from "application/localDatabase/NotesDatabase";
import Note from "application/models/Note";

class ServiceNotes {

    private static instance: ServiceNotes;
    private db = new NotesDatabase();


    constructor() {
        if (!ServiceNotes.instance) {
            ServiceNotes.instance = this;
        }

        return ServiceNotes.instance;
    }

    async getNotes(): Promise<Note[]> {

        try {
            return this.db.getAllNotes();
        } catch (error) {
            throw error;
        }

    }

    async getAllUnSyncedNotes(): Promise<Note[]> {
        try {
            return this.db.getAllUnSyncedNotes();
        } catch (error) {
            Logger.logError(error);
            throw error;
        }
    }


    async addNewNote(title: string, content: string): Promise<Note> {
        try {

            const note = new Note(0, title, content);

            const newNoteID = await this.db.addNewNote(note);
            note.id = newNoteID;

            return note;
        } catch (error) {

            Logger.logError(error);

            throw error;
        }

    }


    async deleteNote(noteId: number): Promise<Boolean> {
        try {

            const deletedRows = await this.db.deleteNote(noteId);
            return deletedRows === 0 ? false : true
        } catch (error) {

            Logger.logError(error);

            throw error;
        }
    }

    async editNote(currentNote: Note, newTitle: string, newContent: string): Promise<Boolean> {
        try {
            const editedRows = await this.db.editNote(currentNote.id, newTitle, newContent);
            return editedRows === 0 ? false : true
        } catch (error) {

            Logger.logError(error);

            throw error;
        }
    }



}

export default new ServiceNotes();
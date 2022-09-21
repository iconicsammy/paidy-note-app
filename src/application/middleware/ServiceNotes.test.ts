jest.mock('expo-sqlite')


import Logger from "application/Analytics/Logger";

import NotesDatabase from "application/localDatabase/NotesDatabase";
import Note from "application/models/Note";
import ServiceNotes from "./ServiceNotes";

describe("Service Notes", () => {

    let spyAddNewNote: any;
    let spyDeleteNote: any;

    let spyLoggerError: any;

    beforeEach(() => {
        spyAddNewNote = jest.spyOn(NotesDatabase.prototype, "addNewNote")
        spyDeleteNote = jest.spyOn(NotesDatabase.prototype, "deleteNote");
        spyLoggerError = jest.spyOn(Logger, "logError");
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })


    fit("should add new note", async () => {
        spyAddNewNote.mockResolvedValue(144);
        const note = new Note(0, "title", "content");

        const noteUpdated = await ServiceNotes.addNewNote("title", "content");
    
        expect(noteUpdated.id).toStrictEqual(144)

        expect(spyAddNewNote).toHaveBeenCalled();
        expect(spyLoggerError).not.toHaveBeenCalled();



    })

    fit("should add new note - handle error", async () => {
        spyAddNewNote.mockRejectedValue("error adding note");
        spyLoggerError.mockReturnValue(true);
        const note = new Note(0, "title", "content");

        try {
            await ServiceNotes.addNewNote("title", "content");
        } catch (error) {
            expect(spyAddNewNote).toHaveBeenCalledWith(note);
            expect(spyLoggerError).toHaveBeenCalledWith(error)
        }


    })

    fit("should delete note - deleted", async () => {
        spyDeleteNote.mockResolvedValue(1);

        const result = await ServiceNotes.deleteNote(1);
        expect(result).toStrictEqual(true)

    })

    fit("should delete note - ID not found", async () => {
        spyDeleteNote.mockResolvedValue(0);

        const result = await ServiceNotes.deleteNote(1);
        expect(result).toStrictEqual(false)

    })


})
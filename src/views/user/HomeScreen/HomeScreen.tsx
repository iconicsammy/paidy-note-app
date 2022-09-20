import { NoteDto } from "application/Dtos/NoteDto";
import Note from "application/models/Note";
import React, { useCallback, useState } from "react";
import { SafeAreaView, Text, StyleSheet, RefreshControl, View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import NoteRow from "../components/NoteRow/NoteRow";
import { Portal, Modal } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ServiceNotes from "application/middleware/ServiceNotes";
import Toaster from "utils/Toaster";
import { initStoreWithNotes, addNewNote, deleteNote, updateNote } from "store/reducers/noteReducer";
import { FAB } from 'react-native-paper';
import globalStyle from "assets/globalStyle";
import NoteEditor from "../components/NoteEditor/NoteEditor";

function HomeScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    //activeNote refers to note we are currently editing. 0 would mean adding a new note
    const [activeNote, setActiveNote] = useState<Note>(new Note(0, "", ""))
    const dispatch = useDispatch();
    const notes = useSelector((state: any) => state.notes);

    useEffect(() => {
        getSavedNotes();
    }, [])

    const saveNewNote = async (title: string, content: string) => {
        try {
            const noteWithDBID = await ServiceNotes.addNewNote(title, content);
            dispatch(addNewNote(noteWithDBID.noteDetails));

        } catch (error) {
            Toaster.show("Sorry, there was an error saving your note")
        }

        setEditorOpen(false)

    }

    const editNote = async (updatedTitle: string, updatedContent: string) => {
        try {


            const updatedRows = await ServiceNotes.editNote(activeNote, updatedTitle, updatedContent);
            if (updatedRows) {
                dispatch(updateNote({ id: activeNote.id, title: updatedTitle, content: updatedContent }))
            } else {
                Toaster.show("There was no error but nothing seems to have been updated.")
            }
        } catch (error) {
            Toaster.show("Sorry, there was an error saving your note")
        }
        setEditorOpen(false)
    }

    const handleNoteDeletion = async (noteID: number) => {
        try {
            await ServiceNotes.deleteNote(noteID);
            dispatch(deleteNote(noteID))
        } catch (error) {
            Toaster.show("there was an error deleting the note")
        }

    }

    const showNoteEditor = (note: Note) => {
        setEditorOpen(!editorOpen)
        setActiveNote(note);
    }

    const handleNoteEditor = async (title: string, content: string) => {
        /*
            Called from note editor
        */
        if (activeNote.id === 0) {
            //add a new note
            await saveNewNote(title, content);

        } else {
            //edit the note
            await editNote(title, content)
        }

    }

    const getSavedNotes = async () => {

        try {
            const mySavedNotes = await ServiceNotes.getNotes();
            dispatch(initStoreWithNotes(mySavedNotes));
        } catch (error) {
            Toaster.show("Error getting saved notes")
        }
    }


    const handlePullRefresh = useCallback(async () => {
        setRefreshing(true);
        await getSavedNotes();
        setRefreshing(false);
    }, [refreshing]);

    return (<SafeAreaView style={{...globalStyle.container, backgroundColor: "#22f096"}}>
        {notes.length > 0 ? (

            <ScrollView   
                refreshControl={(
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handlePullRefresh}
                    />
                )}
            >
                {notes.map((note: Note, index: number) => {
                    return (
                        <NoteRow rowIndex={index} note={note} key={note.id} handleNoteDeletion={handleNoteDeletion} handleNoteEdition={showNoteEditor} />
                    )
                })}
            </ScrollView>



        ) : <Text>You haven't added notes yet...</Text>}



        <FAB
            color="#fff"
            size="medium"
            icon="plus"
            style={styles.fab}
            onPress={() => {
                setEditorOpen(!editorOpen)
                setActiveNote(new Note(0, "", ""))
            }
            }

        />



        <Portal>
            <Modal visible={editorOpen} onDismiss={() => setEditorOpen(!editorOpen)} contentContainerStyle={globalStyle.formModal}>
                <NoteEditor handleNoteInformation={handleNoteEditor} note={activeNote} />
            </Modal>
        </Portal>




    </SafeAreaView>



    )
}


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        left: 20,
        bottom: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#00f",
        fontSize: 40
    }
})

export default HomeScreen;
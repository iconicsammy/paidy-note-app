import { createSlice } from "@reduxjs/toolkit";
import Note from "application/models/Note";



const noteSlice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        addNewNote: (state: any, action) =>{
            state.unshift(action.payload);
        },

        initStoreWithNotes: (state: any, action) =>{
           state.length = 0
           state.push(...action.payload)
        },

        deleteNote: (state: any, action) => {
            
            const newState = state.filter((note: Note) => {
                return note.id !== action.payload
            })
            state.length = 0;
            state.push(...newState)

        },

        updateNote: (state: any, action) => {
            const notes : Note[]= [];
            state.map((note: Note)=>{
                 if (note.id !== action.payload.id){
                    notes.push(note)
                 }else{
                    note.title = action.payload.title
                    note.content = action.payload.content;
                    notes.push(note)
                 }
            })
         
            state.length = 0;
            state.push(...notes)
        }
    }
});

// export actions now
export const { addNewNote, initStoreWithNotes, deleteNote, updateNote } = noteSlice.actions;

export default noteSlice.reducer;
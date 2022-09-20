import React, { useState } from "react";
import Note from "application/models/Note";
import { Card, Paragraph, IconButton, MD3Colors, TextInput } from 'react-native-paper';

interface props {
    note: Note,
    handleNoteInformation: Function
}

function NoteEditor({ note, handleNoteInformation }: props) {
    const [title, setTitle] = useState(note?.title || "");
    const [content, setContent] = useState(note?.content || "");

    const handleSavingChanges = () =>{
        handleNoteInformation(title, content)
    }

    return (<Card>
        <Card.Title title={note.id ===0 ? "Add New Note": "Edit Note"} />
        <Card.Content>
            <TextInput
                label="title"
                value={title}
                onChangeText={text => setTitle(text)}
            />

            <TextInput
                label="Description"
                value={content}
                onChangeText={text => setContent(text)}
            />
        </Card.Content>
        <Card.Actions>
            <IconButton
                icon="check"
                iconColor={MD3Colors.primary20}
                size={20}
                onPress={handleSavingChanges}
            />


        </Card.Actions>
    </Card>)
}

export default NoteEditor;
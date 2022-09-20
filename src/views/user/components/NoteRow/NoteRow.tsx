import React from "react";
import Note from "application/models/Note";
import { Text, Card, Paragraph, IconButton, MD3Colors } from 'react-native-paper';

interface props {
    rowIndex: number;
    note: Note,
    handleNoteDeletion: Function,
    handleNoteEdition: Function
}

function NoteRow({ note, handleNoteDeletion, handleNoteEdition}: props){
    return(<Card mode="outlined" style={{margin: 10}}>
        <Card.Title title={note.title} />
        <Card.Content>
            <Paragraph>{note.content}</Paragraph>
        </Card.Content>
        <Card.Actions>
            <IconButton
                icon="pencil"
                iconColor={MD3Colors.primary20}
                size={20}
                onPress={() => handleNoteEdition(note)}
            />

            <IconButton
                icon="delete"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => handleNoteDeletion(note.id)}
            />


        </Card.Actions>
    </Card>)
}

export default NoteRow;
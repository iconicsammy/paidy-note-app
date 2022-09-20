import { NoteDto, NoteQueryParameters } from 'application/Dtos/NoteDto';
import { Comparison } from 'application/enums/enums';
import Note from 'application/models/Note';
import * as SQLite from 'expo-sqlite';


const NOTES_TABLE_NAME = "notes";
const db = SQLite.openDatabase("paidy_notes_db.db")

class NotesDatabase {


    constructor() {

            this.setUpTables();
        
        
    }


    private setUpTables() {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${NOTES_TABLE_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, isSyncedWithServer BOOL,createdOn date)`
            )
        })
    }

    //doing AND comparison only for now.
    private queryDB(queryArguments: NoteQueryParameters[] = []): Promise<Note[]> {


        let sqlStatement = `SELECT * FROM ${NOTES_TABLE_NAME}`;

        const queryArgumentsValues: any[] = [];

        const totalQueryParameters = queryArguments.length;

        if (totalQueryParameters > 0) {
            sqlStatement = sqlStatement + " WHERE ";
            for (let counter = 0; counter < totalQueryParameters; counter++) {
                const fieldName = queryArguments[counter].fieldName
                const comparisonSign = queryArguments[counter].comparison
                sqlStatement = ` ${sqlStatement}  ${fieldName} ${comparisonSign} ? AND`;
                queryArgumentsValues.push(queryArguments[counter].value)
            }

            sqlStatement = sqlStatement.slice(0, -3); // -3 is to remove the last 3 chars i.e.g AND
        }

        sqlStatement = `${sqlStatement} ORDER BY id DESC`;
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    sqlStatement, queryArgumentsValues,
                    (_, result) => {
                        resolve(Array.from(result.rows._array as any) as Note[])
                    },
                    (_, error) => {

                        reject(error)
                        return false
                    }
                )
            })
        })

    }

    getAllUnSyncedNotes(): Promise<Note[]> {
        const queryParams: NoteQueryParameters[] = [
            {
                fieldName: "isSyncedWithServer",
                comparison: Comparison.equalsTo,
                value: true
            }
        ]

        return this.queryDB(queryParams);

    }

    getAllNotes(): Promise<Note[]> {

        return this.queryDB();
    }

    addNewNote(note: Note): Promise<number> {

        const insertNoteSQLStatement = `INSERT INTO ${NOTES_TABLE_NAME} (title, content, createdOn, isSyncedWithServer) values (?,?,?, ?)`;

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    insertNoteSQLStatement, [note.title, note.content ?? "", new Date().toDateString(), 0],
                    (_, result) => {
                        resolve(result.insertId ?? 0)
                    },
                    (_, error) => {
                        reject(error)
                        return false
                    }
                )
            })

        });


    }

    deleteNote(noteId: number): Promise<number> {

        const deleteNoteSQLStatement = `DELETE FROM ${NOTES_TABLE_NAME} WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    deleteNoteSQLStatement, [noteId],
                    (_, result) => {
                        resolve(result.rowsAffected ?? 0)
                    },
                    (_, error) => {
                        reject(error)
                        return false
                    }
                )
            })

        });


    }


    editNote(noteId: number, title: string, content: string): Promise<number> {

        const editNoteSQLStatement = `UPDATE ${NOTES_TABLE_NAME} SET title=?, content=? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    editNoteSQLStatement, [title, content, noteId],
                    (_, result) => {
                        resolve(result.rowsAffected ?? 0)
                    },
                    (_, error) => {
                        reject(error)
                        return false
                    }
                )
            })

        });


    }


}



export default NotesDatabase;
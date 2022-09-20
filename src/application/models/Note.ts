import { NoteDto } from "application/Dtos/NoteDto";


class Note {
    private _id: number;
    private _title: string;
    private _content?: string = "";
    private _isSyncedWithServer?: boolean = false
    private _createdOn?: Date = new Date();


    constructor(id: number, title: string, content: string, isSyncedWithServer: boolean = false, createdOn: Date = new Date()){
        this._id = id
        this._title = title
        this._content = content;
        this._isSyncedWithServer = isSyncedWithServer;
        this._createdOn = createdOn;
    }

    get id() {
        return this._id
    }

    set id(value: number) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    set content(value: string){
        this._content = value;
    }

    get createdOn() {
        return this._createdOn;
    }

    get content() {
        return this._content
    }

    get isSyncedWithServer() {
        return this._isSyncedWithServer
    }

    get noteDetails() : NoteDto{
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            isSyncedWithServer: this.isSyncedWithServer
        }
    }
}

export default Note;
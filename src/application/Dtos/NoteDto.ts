import { Comparison } from "application/enums/enums";

export interface NoteDto {
    id?: number;
    title: string;
    content?: string;
    createdOn?: Date;
    isSyncedWithServer?: boolean
}



export interface NoteQueryParameters {
    fieldName : string;
    comparison: Comparison,
    value: string | number | boolean
}
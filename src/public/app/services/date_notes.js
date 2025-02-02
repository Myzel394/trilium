import froca from "./froca.js";
import server from "./server.js";
import ws from "./ws.js";

/** @returns {NoteShort} */
async function getInboxNote() {
    const note = await server.get('special-notes/inbox/' + dayjs().format("YYYY-MM-DD"), "date-note");

    return await froca.getNote(note.noteId);
}

/** @returns {NoteShort} */
async function getTodayNote() {
    return await getDateNote(dayjs().format("YYYY-MM-DD"));
}

/** @returns {NoteShort} */
async function getDateNote(date) {
    const note = await server.get('special-notes/date/' + date, "date-note");

    await ws.waitForMaxKnownEntityChangeId();

    return await froca.getNote(note.noteId);
}

/** @returns {NoteShort} */
async function getWeekNote(date) {
    const note = await server.get('special-notes/week/' + date, "date-note");

    await ws.waitForMaxKnownEntityChangeId();

    return await froca.getNote(note.noteId);
}

/** @returns {NoteShort} */
async function getMonthNote(month) {
    const note = await server.get('special-notes/month/' + month, "date-note");

    await ws.waitForMaxKnownEntityChangeId();

    return await froca.getNote(note.noteId);
}

/** @returns {NoteShort} */
async function getYearNote(year) {
    const note = await server.get('special-notes/year/' + year, "date-note");

    await ws.waitForMaxKnownEntityChangeId();

    return await froca.getNote(note.noteId);
}

/** @returns {NoteShort} */
async function createSqlConsole() {
    const note = await server.post('special-notes/sql-console');

    await ws.waitForMaxKnownEntityChangeId();

    return await froca.getNote(note.noteId);
}

/** @returns {NoteShort} */
async function createSearchNote(opts = {}) {
    const note = await server.post('special-notes/search-note', opts);

    await ws.waitForMaxKnownEntityChangeId();

    return await froca.getNote(note.noteId);
}

export default {
    getInboxNote,
    getTodayNote,
    getDateNote,
    getWeekNote,
    getMonthNote,
    getYearNote,
    createSqlConsole,
    createSearchNote
}

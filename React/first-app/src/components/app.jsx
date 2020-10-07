import React from "react";
import Header from "./header";
import Note from "./note";
import Footer from "./footer";
import Notes from "../notes";

function app(){
    return (<div>
        <Header />
        {Notes.map(note => <Note key={note.key} title={note.title} content={note.content}/>)}
        <Footer />
    </div>);
}

export default app;
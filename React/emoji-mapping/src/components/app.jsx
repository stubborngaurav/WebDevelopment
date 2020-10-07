import React from "react";
import Emojipedia from "../emojipedia";
import Entry from "./entry";

function createEntry(entry){
    return (
        <Entry 
            key={entry.id}
            emoji={entry.emoji}
            name={entry.name}
            meaning={entry.meaning}
        />
    );
}

function app(){
    return (<div>
    <h1><span> emojipedia </span></h1>
    <div>
        <dl className="dictionary">
            {Emojipedia.map(createEntry)}
        </dl>
    </div>
    
    </div>);
}

export default app;
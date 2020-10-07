import React from "react";
//import Cards from "./cards";
import Card from "./card";
import Contacts from "../contacts";

// using cards in group
// function app(){
//     return(<div>
//     <h1 className="heading">My Contacts</h1>
//     <Cards contacts={Contacts}/>
//     </div>);
// }

function createCard(contact) {
    return (
        <Card 
            key={contact.id}
            name={contact.name}
            imgURL={contact.imgURL}
            phone={contact.phone}
            email={contact.email}
        />
    );
}

// using individual card
function app(){
    return(
    <div>
        <h1 className="heading">My Contacts</h1>
        {Contacts.map(createCard)}
    </div>);
}

export default app;

import React from "react";
import Card from "./Card";
import contacts from "../contacts";
import Avatar from "./Avatar";

function createCard(contact) {
  return (
    <Card
      key={contact.id}
      id={contact.id}
      name={contact.name}
      imgURL={contact.imgURL}
      tel={contact.phone}
      email={contact.email}
    />
  );
}

function App() {
  return (
    <div>
      <Avatar imgURL="https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png" />

      <h1 className="heading">Contacts</h1>

      {contacts.map(createCard)}
    </div>
  );

  /*
  let appContent = [];
  for (let i = 0; i < contacts.length; i++) {
    appContent.push(
      <Card
        name={contacts[i].name}
        imgURL={contacts[i].imgURL}
        phone={contacts[i].phone}
        email={contacts[i].email}
      />
    );
  }
  return appContent;
  */
}

export default App;

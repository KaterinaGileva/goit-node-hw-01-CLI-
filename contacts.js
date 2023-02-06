const fs = require('fs/promises');
const path = require('path');
const ObjectID = require("bson-objectid");

 const contactsPath = path.resolve(__dirname, 'db/contacts.json');
 async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

const listContacts = async() => {
  try{
   const list = await fs.readFile(contactsPath);
   const contacts = JSON.parse(list);
    return contacts;
  }
  catch (err) {
    console.error(err)
  }
  }
  
 const getContactById = async(contactId)=> {
  try {
  const contacts = await listContacts();
  const currentContact = contacts.find((contact) => contact.id === contactId);
  if (!currentContact) {
    return null;
  }
  return currentContact;
} catch (err) {
  console.error(err);
}
}
  
  const addContact = async (name, email, phone)=> {
    try {
      const contacts = await listContacts();
      const newContact = {
        id: ObjectID(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      updateContacts(contacts);
      return newContact;
    } catch (err) {
      console.error(err);
    }
  }

const  removeContact = async (contactId)=> {
  try {             
        const contacts = await listContacts();
        const idx = contacts.findIndex(({ id }) => id === contactId);
        if (idx === -1) {
          return null;
        }
        const [removeContact] = contacts.splice(idx, 1);
        updateContacts(contacts);
        return removeContact;
      } catch (err) {
        console.error(err);
      }
    }                 
                            
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };
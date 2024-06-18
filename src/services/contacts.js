import ContactsCollection from '../db/models/Contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contacts = await ContactsCollection.findById(id);
  return contacts;
};

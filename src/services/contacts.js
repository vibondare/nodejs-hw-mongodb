import ContactsCollection from '../db/models/Contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contacts = await ContactsCollection.findById(id);
  return contacts;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const upsertContact = async (contactId, payload, options = {}) => {
  const result = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};

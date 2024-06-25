import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const data = await getAllContacts();

  res.json({
    status: 200,
    data,
    message: 'Successfully found contacts!',
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await getContactById(contactId);

  if (!data) {
    next(createHttpError(404, `Contact with id ${contactId} not found`));
    return;
  }

  res.json({
    status: 200,
    data,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const createContactController = async (req, res) => {
  const data = req.body;

  const contact = await createContact(data);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = req.body;

  const result = await upsertContact(contactId, data);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

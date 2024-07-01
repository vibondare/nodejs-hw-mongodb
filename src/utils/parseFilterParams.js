import { contactsTypesList } from '../constants/contacts-constants.js';

const parseType = (type) => {
  if (typeof type !== 'string') {
    return;
  }

  if (contactsTypesList.includes(type)) return type;
};

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;

  if (!['true', 'false'].includes(value)) {
    return;
  }

  if (value === 'false') {
    console.log("dog");
    return false;
  }

  console.log("cat");
  return true;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavorite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavorite,
  };
};

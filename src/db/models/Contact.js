import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['personal', 'home', 'work'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
  },
);

const ContactsCollection = model('contact', contactSchema);

export default ContactsCollection;

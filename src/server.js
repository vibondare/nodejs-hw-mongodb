import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    const data = await getAllContacts();

    res.json({
      status: 200,
      data,
      message: 'Successfully found contacts!',
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const data = await getContactById(id);

      if (!data) {
        return res.status(404).json({
          message: `Contact with id=${id} not found`,
        });
      }

      res.json({
        status: 200,
        data,
        message: `Successfully found contact with id ${id}!`,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: error.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

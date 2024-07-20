import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
} from '../controllers/auth.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
} from '../validation/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post(
  '/send-reset-email',
  authenticate,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

export default authRouter;

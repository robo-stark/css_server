import express from 'express';
const router = express.Router();

import userRoutes from './../domains/user/routes.js';
import otpRoutes from '../domains/otp/routes.js';
import dataRoutes from '../domains/data/routes.js';

router.use("/user", userRoutes);
router.use("/otp", otpRoutes);
router.use("/data", dataRoutes);

export default router;


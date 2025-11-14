/**
 * Authentication Controller
 */

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ApiError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError('Validation failed', 400);
      }

      const { email, password, firstName, lastName, role } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new ApiError('User already exists', 409);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: role || 'RECRUITER',
        },
      });

      // @ts-ignore - JWT types issue with expiresIn string format
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRE || '24h' },
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { user: { id: user.id, email: user.email, role: user.role }, token },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new ApiError('Invalid credentials', 401);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ApiError('Invalid credentials', 401);
      }

      // @ts-ignore - JWT types issue with expiresIn string format
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRE || '24h' },
      );

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      res.json({
        success: true,
        message: 'Login successful',
        data: { user: { id: user.id, email: user.email, role: user.role }, token },
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          phoneNumber: true,
          department: true,
          position: true,
          createdAt: true,
        },
      });

      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updates = req.body;
      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: updates,
      });

      res.json({ success: true, message: 'Profile updated', data: user });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
      });

      const isMatch = await bcrypt.compare(currentPassword, user!.password);
      if (!isMatch) {
        throw new ApiError('Current password is incorrect', 401);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({
        where: { id: req.user!.id },
        data: { password: hashedPassword },
      });

      res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({ success: true, message: 'Token refreshed' });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

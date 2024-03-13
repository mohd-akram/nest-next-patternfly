import { randomBytes } from 'crypto';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as pbkdf2 from '@phc/pbkdf2';

import { Repository } from 'typeorm';
import User from './user.entity';
import Session from './session.entity';

@Injectable()
export class AuthService {
  cookieName = 'sid';

  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    @InjectRepository(Session) public sessionRepository: Repository<Session>,
  ) {}

  async signup(email: string, password: string, name: string) {
    if (await this.userRepository.findOneBy({ email })) {
      throw new BadRequestException('User already exists');
    }
    await this.userRepository
      .create({
        email,
        password: await pbkdf2.hash(password),
        name,
      })
      .save();
  }

  async login(req: Request, res: Response): Promise<void> {
    let { email, password } = (req.body ?? {}) as Record<string, string>;
    email ??= '';
    password ??= '';
    const user = await this.userRepository.findOneBy({ email });
    const isValid = user && (await pbkdf2.verify(user.password, password));
    if (!isValid) {
      this.clearCookie(res);
      throw new UnauthorizedException();
    }
    const sessionId = randomBytes(16).toString('hex');
    const maxAge = 14 * 24 * 60 * 60;
    await this.deleteSession(req);
    await this.sessionRepository
      .create({
        key: sessionId,
        userId: user._id,
      })
      .save();
    void res.setCookie(this.cookieName, sessionId, { maxAge, httpOnly: true });
  }

  async logout(req: Request, res: Response): Promise<void> {
    await this.deleteSession(req);
    this.clearCookie(res);
  }

  async authorize(req: Request, res: Response): Promise<void> {
    const sessionId = req.cookies[this.cookieName];
    const session = sessionId
      ? await this.sessionRepository.findOneBy({ key: sessionId })
      : null;
    if (!session) {
      this.clearCookie(res);
      throw new UnauthorizedException();
    }
  }

  private async deleteSession(req: Request) {
    const sessionId = req.cookies[this.cookieName];
    if (!sessionId) return;
    await this.sessionRepository.delete({ key: sessionId });
  }

  private clearCookie(res: Response) {
    void res.clearCookie(this.cookieName);
  }
}

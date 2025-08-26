/*import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';
import { ILogger, SynviaLogs } from '../../shared/logs';
import { MfaService } from './mfa.service';
import { randomUUID } from 'crypto';
import { createClient } from 'redis';
import { RedisAsyncProvider } from 'src/redis/redis.provider';
import { formatSessionRedisKey, TIME_TO_EXPIRE_SESSION } from 'src/shared/activity-session';

@Injectable()
export class AuthService {
  private logger: ILogger = new SynviaLogs();

  private createJwtPayload({ userId, userEmail }: { userId: string; userEmail: string }) {
    const jti = randomUUID(); // jwt token identifier

    return { userId, email: userEmail, jti };
  }

  private async createUserSession(params: { userId: string; jti: string }) {
    const redisKey = formatSessionRedisKey(params);

    await this.redisClient.set(redisKey, 'active', { EX: TIME_TO_EXPIRE_SESSION });
  }

  constructor(
    @Inject(RedisAsyncProvider)
    private readonly redisClient: ReturnType<typeof createClient>,
    private readonly userService: UserService,
    private readonly mfaService: MfaService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string, source: string) {
    try {
      this.logger.info(`[AuthService] - signIn - Starting`, { email });
      const user = await this.userService.findByEmail(email);

      if (!user || !user.isActive || !user?.password) {
        throw new UnauthorizedException(`Usuário ou senha inválidos.`);
      }

      const match = await compare(password, user.password as string);

      if (!match) {
        throw new UnauthorizedException(`Usuário ou senha inválidos.`);
      }

      await this.validateUserSource(user.type, source);

      if (user.settings) {
        await this.mfaService.generateCode(user.id, user.email ?? '');
        return { isMfaEnabled: true, userId: user.id };
      }

      const payload = this.createJwtPayload({ userId: user.id, userEmail: user.email ?? '' });

      this.logger.info(`[AuthService] - signIn - Login OK`);

      await this.createUserSession(payload);

      return {
        user: { ...user, password: undefined },
        token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      throw err;
    }
  }

  async signInWithMfa(userId: string, code: string) {
    try {
      const user = await this.userService.findById(userId);

      const isValidToken = await this.mfaService.validateToken(userId, code);
      if (!isValidToken) throw new UnauthorizedException('Código inválido');

      const payload = this.createJwtPayload({ userId: user.id, userEmail: user.email ?? '' });

      this.logger.info(`[AuthService] - signInWithMfa - Login OK`);

      await this.createUserSession(payload);

      return {
        user: { ...user, password: undefined },
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async validateUserSource(userType: 'end_user' | 'tech' | 'business', source: string) {
    if (source === 'backoffice' && !['business', 'tech'].includes(userType)) throw new UnauthorizedException();

    if (source === 'web' && ['business', 'tech'].includes(userType)) throw new UnauthorizedException();
  }

  async me(userId: string) {
    const user = await this.userService.findById(userId);
    return user;
  }
}*/
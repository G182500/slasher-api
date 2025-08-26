import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { Observable } from 'rxjs';

/*Uma classe anotada com o decorador @Injectable(), que implementa a interface CanActivate.
Para criar um guard, devemos implementar a interface CanActivate. Essa interface requer um
método canActivate que é chamado toda vez que uma solicitação é feita para uma rota decorada
com o guard. O método canActivate recebe um argumento ExecutionContext e deve retornar um valor
booleano que indica se a rota pode ser acessada.*/

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });

			console.log(payload);

			return true;

    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request) {
		console.log(request.headers);
		return null;
    //const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //return type === 'Bearer' ? token : undefined;
  }
}


/*import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';
import { UserRepository } from '../user/user.repository';
import { createClient } from 'redis';
import { RedisAsyncProvider } from 'src/redis/redis.provider';
import { formatSessionRedisKey, TIME_TO_EXPIRE_SESSION } from 'src/shared/activity-session';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(RedisAsyncProvider)
    private readonly redisClient: ReturnType<typeof createClient>,
    private jwtService: JwtService,
    private reflector: Reflector,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });

      const redisKey = formatSessionRedisKey(payload);
      const sessionExists = await this.redisClient.get(redisKey);

      if (!sessionExists) {
        throw new UnauthorizedException();
      }

      await this.redisClient.expire(redisKey, TIME_TO_EXPIRE_SESSION);

      const user = await this.userRepository.findById(payload.userId);
      if (!user?.isActive) throw new UnauthorizedException();

      await this.validateUserSource(user.type, request.headers['x-source']);
      const studyId = request.headers['x-study'];
      const userStudy = await this.userRepository.findByUserIdAndStudyId(user.id, studyId).catch(error => {
        console.log('error', error);
      });

      request['user'] = { ...user, study: userStudy };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async validateUserSource(userType: 'end_user' | 'tech' | 'business', source: string) {
    if (source === 'backoffice' && !['business', 'tech'].includes(userType)) throw new UnauthorizedException();

    if (source === 'web' && ['business', 'tech'].includes(userType)) throw new UnauthorizedException();
  }
}*/
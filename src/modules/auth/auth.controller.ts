/*import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './public.decorator';
import { MfaDto } from './dto/mfa.dto';
import { CustomRequest } from 'src/@types/custom-request';
import { GetAuthenticatedUserOutput, SignInOutput } from '@ecrf/api-contract';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @Public()
  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  signIn(@Body() signInDto: AuthDto, @Headers('x-source') source: string): Promise<SignInOutput> {
    return this.authService.signIn(signInDto.email, signInDto.password, source);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/mfa')
  @Public()
  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  signInWithMfa(@Body() mfaDto: MfaDto) {
    return this.authService.signInWithMfa(mfaDto.userId, mfaDto.code);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  me(@Req() request: CustomRequest): GetAuthenticatedUserOutput {
    return request.user;
  }
}*/
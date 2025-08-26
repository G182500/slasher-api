import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '12h' },
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

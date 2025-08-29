import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '12h' },
    }), MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

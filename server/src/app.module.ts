import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { DealModule } from './deal/deal.module';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot(), AuthModule, CompanyModule, DealModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

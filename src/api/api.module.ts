import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CompanyModule, UserModule],
})
export class ApiModule {}

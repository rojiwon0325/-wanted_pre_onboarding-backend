import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CompanyModule, UserModule, RecruitmentModule],
})
export class ApiModule {}

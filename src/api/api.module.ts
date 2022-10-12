import { Module } from '@nestjs/common';
import { ApplyRecruitmentModule } from './apply-recruitment/apply-recruitment.module';
import { CompanyModule } from './company/company.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CompanyModule,
    UserModule,
    RecruitmentModule,
    ApplyRecruitmentModule,
  ],
})
export class ApiModule {}

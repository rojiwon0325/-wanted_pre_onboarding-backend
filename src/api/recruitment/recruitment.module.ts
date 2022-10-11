import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentService } from './application/recruitment.service';
import { RecruitmentEntity } from './infrastructure/recruitment.entity';
import { RecruitmentEntityMapper } from './infrastructure/recruitment.mapper';
import { RecruitmentRepository } from './infrastructure/recruitment.repository';
import { RecruitmentController } from './presentation/recruitment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecruitmentEntity])],
  providers: [
    RecruitmentEntityMapper,
    RecruitmentRepository,
    RecruitmentService,
  ],
  controllers: [RecruitmentController],
})
export class RecruitmentModule {}

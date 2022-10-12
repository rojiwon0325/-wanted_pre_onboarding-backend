import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyRecruitmentService } from './application/apply-recruitment.service';
import { ApplyRecruitmentEntity } from './infrastructure/apply-recruitment.entity';
import { ApplyRecruitmentEntityMapper } from './infrastructure/apply-recruitment.mapper';
import { ApplyRecruitmentRepository } from './infrastructure/apply-recruitment.repository';
import { ApplyRecruitmentController } from './presentation/apply-recruitment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyRecruitmentEntity])],
  providers: [
    ApplyRecruitmentEntityMapper,
    ApplyRecruitmentRepository,
    ApplyRecruitmentService,
  ],
  controllers: [ApplyRecruitmentController],
})
export class ApplyRecruitmentModule {}

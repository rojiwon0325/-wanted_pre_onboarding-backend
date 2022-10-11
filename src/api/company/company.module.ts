import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './application/company.service';
import { CompanyEntity } from './infrastructure/company.entity';
import { CompanyEntityMapper } from './infrastructure/company.mapper';
import { CompanyRepository } from './infrastructure/company.repository';
import { CompanyController } from './presentation/company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyEntityMapper, CompanyRepository, CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}

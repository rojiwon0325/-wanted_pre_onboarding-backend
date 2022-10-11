import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './infrastructure/company.entity';
import { CompanyEntityMapper } from './infrastructure/company.mapper';
import { CompanyRepository } from './infrastructure/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyEntityMapper, CompanyRepository],
})
export class CompanyModule {}

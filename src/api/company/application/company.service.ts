import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../domain/company.aggregate';
import { ICompany } from '../domain/company.interface';
import { ICompanyRepository } from '../domain/repository.interface';
import { CompanyRepository } from '../infrastructure/company.repository';
import {
  CreateCompanyDTO,
  FindOneCompanyDTO,
  RemoveCompanyDTO,
} from './company.service.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async create(dto: CreateCompanyDTO): Promise<ICompany> {
    const { name, country, region } = dto;
    const company = Company.get({ name, country, region });
    return this.companyRepository.save(company);
  }

  async findOne(dto: FindOneCompanyDTO): Promise<ICompany> {
    return this.companyRepository.findOne(dto.id);
  }

  async remove(dto: RemoveCompanyDTO): Promise<void> {
    const company = await this.companyRepository.findOne(dto.id);
    return this.companyRepository.remove(company);
  }
}

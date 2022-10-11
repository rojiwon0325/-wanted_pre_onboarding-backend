import { ICompany } from '../domain/company.interface';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from '../application/company.service';
import {
  CreateCompanyBody,
  CreateCompanyResponse,
  FindOneCompanyParam,
  FindOneCompanyResponse,
  RemoveCompanyResponse,
} from './company.controller.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(':company_id')
  async findOne(
    @Param() { company_id: id }: FindOneCompanyParam,
  ): Promise<FindOneCompanyResponse> {
    const company: ICompany = await this.companyService.findOne({ id });
    return { Company: company.getResponseType() };
  }

  @Post()
  async create(
    @Body() body: CreateCompanyBody,
  ): Promise<CreateCompanyResponse> {
    const { name, country, region } = body;
    const Company: ICompany = await this.companyService.create({
      name,
      country,
      region,
    });
    return { Company };
  }

  @Delete(':company_id')
  async remove(
    @Param() { company_id: id }: FindOneCompanyParam,
  ): Promise<RemoveCompanyResponse> {
    await this.companyService.remove({ id });
    return { company_id: id };
  }
}

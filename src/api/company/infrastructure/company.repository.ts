import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { TypeOrmBaseRepository } from 'src/api/common/provider/repository.base';
import { Repository } from 'typeorm';
import { ICompany, ICompanyId } from '../domain/company.interface';
import { ICompanyRepository } from '../domain/repository.interface';
import { CompanyEntity } from './company.entity';
import { CompanyEntityMapper } from './company.mapper';

@Injectable()
export class CompanyRepository
  extends TypeOrmBaseRepository<ICompanyId, ICompany, CompanyEntity>
  implements ICompanyRepository
{
  constructor(
    @Inject(CompanyEntityMapper) mapper: IEntityMapper<ICompany, CompanyEntity>,
    @InjectRepository(CompanyEntity) repository: Repository<CompanyEntity>,
  ) {
    super(mapper, repository);
  }
}

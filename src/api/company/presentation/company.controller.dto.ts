import { ICompanyReponseType } from '../domain/company.interface';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { ICompanyId, ICompanyProperty } from '../domain/company.interface';

export class FindOneCompanyParam {
  @IsNumber()
  @Type(() => Number)
  company_id: number;
}

export type FindOneCompanyResponse = {
  Company: ICompanyReponseType;
};

export class CreateCompanyBody
  implements Omit<ICompanyProperty, keyof BaseAggregate<ICompanyId>>
{
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  region: string;
}

export type CreateCompanyResponse = {
  Company: ICompanyProperty;
};

export type RemoveCompanyResponse = {
  company_id: ICompanyId;
};

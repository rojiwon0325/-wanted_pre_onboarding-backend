import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmMockRepository } from 'src/api/common/provider/mock.repository';
import { CompanyService } from '../application/company.service';
import { CompanyEntity } from '../infrastructure/company.entity';
import { CompanyEntityMapper } from '../infrastructure/company.mapper';
import { CompanyRepository } from '../infrastructure/company.repository';

describe('CompanyService Integration Test', () => {
  let service: CompanyService;
  let mockRepository: TypeOrmMockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(CompanyEntity),
          useClass: TypeOrmMockRepository,
        },
        CompanyEntityMapper,
        CompanyRepository,
        CompanyService,
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    mockRepository = module.get(getRepositoryToken(CompanyEntity));
  });

  afterEach(() => {
    mockRepository.findOne.mockClear();
    mockRepository.find.mockClear();
    mockRepository.save.mockClear();
    mockRepository.remove.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

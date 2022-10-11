import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmMockRepository } from 'src/api/common/provider/mock.repository';
import { RecruitmentService } from '../application/recruitment.service';
import { RecruitmentEntity } from '../infrastructure/recruitment.entity';
import { RecruitmentEntityMapper } from '../infrastructure/recruitment.mapper';
import { RecruitmentRepository } from '../infrastructure/recruitment.repository';

describe('RecruitmentService Integration Test', () => {
  let service: RecruitmentService;
  let mockRepository: TypeOrmMockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(RecruitmentEntity),
          useClass: TypeOrmMockRepository,
        },
        RecruitmentEntityMapper,
        RecruitmentRepository,
        RecruitmentService,
      ],
    }).compile();

    service = module.get<RecruitmentService>(RecruitmentService);
    mockRepository = module.get(getRepositoryToken(RecruitmentEntity));
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

import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDaysOffRulesService } from '../../../../src/resources/company-days-off-rules/company-days-off-rules.service';

describe('CompanyDaysOffRulesService', () => {
  let service: CompanyDaysOffRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyDaysOffRulesService],
    }).compile();

    service = module.get<CompanyDaysOffRulesService>(CompanyDaysOffRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

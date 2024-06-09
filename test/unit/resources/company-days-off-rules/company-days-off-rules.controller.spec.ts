import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDaysOffRulesController } from '../../../../src/resources/company-days-off-rules/company-days-off-rules.controller';
import { CompanyDaysOffRulesService } from '../../../../src/resources/company-days-off-rules/company-days-off-rules.service';

describe('CompanyDaysOffRulesController', () => {
  let controller: CompanyDaysOffRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyDaysOffRulesController],
      providers: [CompanyDaysOffRulesService],
    }).compile();

    controller = module.get<CompanyDaysOffRulesController>(CompanyDaysOffRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

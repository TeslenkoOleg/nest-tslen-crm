import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../common/services/base/base.abstract.service';
import { CompanyDaysOffRules } from './entities/company-days-off-rules.entity';
import { BaseInterfaceService } from '../../common/services/base/base.interface.service';
import { CompanyDaysOffRulesRepository } from './company-days-off-rules.repository';

@Injectable()
export class CompanyDaysOffRulesService extends BaseAbstractService<CompanyDaysOffRules> implements BaseInterfaceService{
    protected currentRepository: CompanyDaysOffRulesRepository;
    constructor (
    private readonly repository: CompanyDaysOffRulesRepository,
    ) {
        super(repository, null);
        this.currentRepository = repository;
    }
}

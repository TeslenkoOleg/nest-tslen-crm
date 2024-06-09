import { Module } from '@nestjs/common';
import { CompanyDaysOffRulesService } from './company-days-off-rules.service';
import { CompanyDaysOffRulesController } from './company-days-off-rules.controller';
import { CompanyDaysOffRulesRepository } from './company-days-off-rules.repository';

@Module({
    controllers: [CompanyDaysOffRulesController],
    providers: [
        CompanyDaysOffRulesService,
        CompanyDaysOffRulesRepository
    ],
    exports: [
        CompanyDaysOffRulesService,
        CompanyDaysOffRulesRepository
    ]
})
export class CompanyDaysOffRulesModule {}

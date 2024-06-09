import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDaysOffRuleDto } from './create-company-days-off-rule.dto';

export class UpdateCompanyDaysOffRuleDto extends PartialType(CreateCompanyDaysOffRuleDto) {}

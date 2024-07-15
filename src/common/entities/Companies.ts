import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CompanyDaysOffRules } from "../../resources/company-days-off-rules/entities/company-days-off-rules.entity";
import { DaysOffScheduler } from "./DaysOffScheduler";
import { UserGroup } from '../../resources/user-group/entities/user-group.entity';

@Entity("companies", { schema: "tslen" })
export class Companies {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
        id: number;

    @Column("varchar", { name: "name", nullable: true, length: 250 })
        name: string | null;

    @Column("varchar", { name: "country", nullable: true, length: 250 })
        country: string | null;

    @OneToMany(
        () => CompanyDaysOffRules,
        (companyDaysOffRules) => companyDaysOffRules.company
    )
        companyDaysOffRules: CompanyDaysOffRules[];

    @OneToMany(
        () => DaysOffScheduler,
        (daysOffScheduler) => daysOffScheduler.company
    )
        daysOffSchedulers: DaysOffScheduler[];

    @OneToMany(() => UserGroup, (usersGroup) => usersGroup.company)
        usersGroups: UserGroup[];
}

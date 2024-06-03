import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersGroup } from "../../resources/users/entities/UsersGroup";
import { CompanyDaysOffRules } from "./CompanyDaysOffRules";
import { DaysOffScheduler } from "./DaysOffScheduler";

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

    @OneToMany(() => UsersGroup, (usersGroup) => usersGroup.company)
        usersGroups: UsersGroup[];
}

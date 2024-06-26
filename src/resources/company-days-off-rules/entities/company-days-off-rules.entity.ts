import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { Companies } from "../../../common/entities/Companies";
import { BaseAbstractEntity } from '../../../common/entities/base/base.abstract.entity';

@Index("companyDaysOffRules_companyId_id_fk", ["companyId"], {})
@Entity("companyDaysOffRules", { schema: "tslen" })
export class CompanyDaysOffRules extends BaseAbstractEntity<CompanyDaysOffRules>{

  @Column("int", { name: "companyId" })
      companyId: number;

  @Column("int", { name: "hospital", nullable: true, default: () => "'11'" })
      hospital: number | null;

  @Column("int", { name: "timeOff", nullable: true, default: () => "'11'" })
      timeOff: number | null;

  @Column("int", { name: "vocation", nullable: true, default: () => "'11'" })
      vocation: number | null;

  @Column("int", { name: "transfer", nullable: true, default: () => "'11'" })
      transfer: number | null;

  @Column("int", { name: "home", nullable: true, default: () => "'11'" })
      home: number | null;

  @Column("tinyint", {
      name: "useScheduler",
      nullable: true,
      default: () => "'0'",
  })
      useScheduler: number | null;

  @ManyToOne(() => Companies, (companies) => companies.id, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
      company: Companies;
}

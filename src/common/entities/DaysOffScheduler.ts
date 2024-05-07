import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "./Companies";

@Index("daysOffScheduler_companies_id_fk", ["companyId"], {})
@Entity("daysOffScheduler", { schema: "tslen" })
export class DaysOffScheduler {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("enum", {
    name: "requestType",
    enum: ["hospital", "timeOff", "vocation", "transfer", "home"],
  })
  requestType: "hospital" | "timeOff" | "vocation" | "transfer" | "home";

  @Column("float", { name: "timeCoefficient", nullable: true, precision: 12 })
  timeCoefficient: number | null;

  @Column("enum", { name: "repeatBy", nullable: true, enum: ["month"] })
  repeatBy: "month" | null;

  @Column("int", { name: "companyId" })
  companyId: number;

  @ManyToOne(() => Companies, (companies) => companies.daysOffSchedulers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
  company: Companies;
}

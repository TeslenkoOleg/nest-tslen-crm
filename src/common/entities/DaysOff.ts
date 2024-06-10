import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { Users } from '../../resources/users/entities/users.entity';
import { BaseAbstractEntity } from './base/base.abstract.entity';


@Index("daysOff_users_null_fk", ["userId"], {})
@Entity("daysOff", { schema: "tslen" })
export class DaysOff extends BaseAbstractEntity<DaysOff>{

  @Column("int", { name: "userId", nullable: true })
      userId: number | null;

  @Column("double", {
      name: "hospital",
      nullable: true,
      precision: 22,
      default: () => "'0'",
  })
      hospital: number | null;

  @Column("double", {
      name: "timeOff",
      nullable: true,
      precision: 22,
      default: () => "'0'",
  })
      timeOff: number | null;

  @Column("double", {
      name: "vocation",
      nullable: true,
      precision: 22,
      default: () => "'0'",
  })
      vocation: number | null;

  @Column("double", {
      name: "transfer",
      nullable: true,
      precision: 22,
      default: () => "'30'",
  })
      transfer: number | null;

  @Column("double", {
      name: "home",
      nullable: true,
      precision: 22,
      default: () => "'10'",
  })
      home: number | null;

  @ManyToOne(() => Users, (user) => user.id, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
      user: Users;
}

import {
    Column,
    Entity,
    Index, JoinColumn, ManyToOne,
    OneToMany,
    OneToOne,
} from "typeorm";
import { UserRelationToGroup } from './UserRelationToGroup';
import { DaysOff } from '../../../common/entities/DaysOff';
import { UserChiefRelation } from '../../../common/entities/UserChiefRelation';
import { TaskProjectPermission } from '../../../common/entities/TaskProjectPermission';
import { GoogleCalendar } from '../../../common/entities/GoogleCalendar';
import { UserProbation } from '../../../common/entities/UserProbation';
import { BaseAbstractEntity } from '../../../common/entities/base/base.abstract.entity';
import { EventsByUser } from '../../events-by-user/entities/events-by-user.entity';
import { JobPosition } from '../../job-position/entities/job-position.entity';

@Index("email", ["email"], { unique: true })
@Entity("users")
export class Users extends BaseAbstractEntity<Users> {
  @Column("enum", {
    name: "role",
    enum: ["admin", "user", "manager"],
    default: () => "'advert'",
  })
  role: "admin" | "user" | "manager";

  @Column("varchar", { name: "firstName", length: 255 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 255 })
  lastName: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "avatar", nullable: true, length: 255 })
  avatar: string | null;

  @Column("varchar", { name: "company", length: 255 })
  company: string;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("varchar", { name: "skype", nullable: true, length: 64 })
  skype: string | null;

  @Column("varchar", { name: "emailSpare", nullable: true, length: 255 })
  emailSpare: string | null;

  @Column("varchar", { name: "tokenActivation", nullable: true, length: 255 })
  tokenActivation: string | null;

  @Column("varchar", { name: "tokenReset", nullable: true, length: 255 })
  tokenReset: string | null;

  @Column("tinyint", { name: "isActive", default: () => "'0'" })
  isActive: number;

  @Column("mediumint", { name: "loginCount", nullable: true })
  loginCount: number | null;

  @Column("datetime", { name: "lastLogin", nullable: true })
  lastLogin: Date | null;

  @Column("int", { name: "companyId", nullable: true })
  companyId: number | null;

  @Column("int", { name: "chiefId", nullable: true })
  chiefId: number | null;

  @Column("int", { name: "mentorId", nullable: true })
  mentorId: number | null;

  @Column("date", { name: "birthDay", nullable: true })
  birthDay: Date | null;

  @Column("date", { name: "firstDayInCompany", nullable: true })
  firstDayInCompany: Date | null;

  @Column("date", { name: "lastDayInCompany", nullable: true })
  lastDayInCompany: Date | null;

  @Column("varchar", { name: "jobPosition", nullable: true })
  jobPosition: string | null;

  @OneToMany(
      () => UserRelationToGroup,
      (userRelationToGroup) => userRelationToGroup.user, { cascade: true }
  )
  userRelationToGroups: UserRelationToGroup[];

  @OneToOne(() => DaysOff, (daysOff) => daysOff.user)
  daysOff: DaysOff[];

  @OneToMany(() => EventsByUser, (eventsByUser) => eventsByUser.user)
  eventsByUsers: EventsByUser[];

  @OneToMany(() => EventsByUser, (eventsByUser) => eventsByUser.user)
  eventsByUsersRequest: EventsByUser[];

  @OneToMany(
      () => UserChiefRelation,
      (userChiefRelation) => userChiefRelation.chief
  )
  userChiefRelationsByChief: UserChiefRelation[];

  @OneToMany(
      () => UserChiefRelation,
      (userChiefRelation) => userChiefRelation.user, { cascade: true }
  )
  userChiefRelations: UserChiefRelation[];
  @OneToMany(
      () => TaskProjectPermission,
      (taskProjectPermission) => taskProjectPermission.user
  )
  taskProjectPermissions: TaskProjectPermission[];

  @OneToOne(() => GoogleCalendar, (googleCalendar) => googleCalendar.user)
  googleCalendars: GoogleCalendar;

  @OneToOne(() => UserProbation, (userProbation) => userProbation.user, { cascade: true })
  userProbation: UserProbation;

  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.users, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "jobPosition", referencedColumnName: "id" }])
  jobPositionDetails: JobPosition[];

}

import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from '../../resources/users/entities/Users';

@Index("googleCalendar_users_id_fk", ["userId"], {})
@Entity("googleCalendar", { schema: "tslen" })
export class GoogleCalendar {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("int", { name: "userId", nullable: true })
      userId: number | null;

  @Column("varchar", { name: "calendarId" })
      calendarId: string;

  @Column("float", { name: "timezone", default: ()=> '0', nullable: true })
      timezone: number | null;

  @ManyToOne(() => Users, (users) => users.googleCalendars, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
      user: Users;
}

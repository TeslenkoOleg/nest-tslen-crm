import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from '../../resources/users/entities/users.entity';


@Index("eventsByUser_users_null_fk", ["userId"], {})
@Entity("eventsByUser", { schema: "tslen" })
export class EventsByUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("int", { name: "userId", nullable: true })
      userId: number | null;

  @Column("text", { name: "title", nullable: true })
      title: string | null;

  @Column("datetime", { name: "start", nullable: true })
      start: Date;

  @Column("datetime", { name: "end", nullable: true })
      end: Date;

  @Column("varchar", { name: "primaryColor", nullable: true, length: 250 })
      primaryColor: string | null;

  @Column("varchar", { name: "secondaryColor", nullable: true, length: 250 })
      secondaryColor: string | null;

  @Column("int", { name: "isRequest", nullable: false })
      isRequest: number;

  @Column("int", { name: "approved", nullable: false })
      approved: number;

  @Column("text", { name: "comment", nullable: true })
      comment: string;

  @Column("varchar", { name: "requestType", nullable: true, length: 250 })
      requestType: string;

  @Column("datetime", { name: "createdAt", nullable: true })
      createdAt: Date | null;

  @Column("float", { name: "timeOffset", nullable: true })
      timeOffset: number;

  @Column("text", { name: "googleId", nullable: true, unique: true })
      googleId: string;

  @Column("int", { name: "isGoogleEvent", nullable: false })
      isGoogleEvent: number;

  @Column("varchar", { name: "googleMeetLink", nullable: true, length: 250 })
      googleMeetLink: string;

  @ManyToOne(() => Users, (users) => users.eventsByUsers, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
      user: Users;
}

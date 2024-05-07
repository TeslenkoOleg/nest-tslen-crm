import {
  Column,
  Entity,
  Index,
  JoinColumn,
   OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from '../../resources/users/entities/Users';

@Index("userProbation_users_id_fk", ["userId"], {})
@Entity("userProbation", { schema: "tslen" })
export class UserProbation {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId", nullable: true })
  userId: number | null;

  @Column("date", { name: "start", nullable: true })
  start: string | null;

  @Column("date", { name: "end", nullable: true })
  end: string | null;

  @Column("tinyint", { name: "isProbation", default: () => "'0'" })
  isProbation: number | null;

  @OneToOne(() => Users, (users) => users.userProbation, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}

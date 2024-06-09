import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from '../../resources/users/entities/users.entity';

@Index("userChiefRelation_users_null_fk", ["userId"], {})
@Entity("userChiefRelation", { schema: "tslen" })
export class UserChiefRelation {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("int", { name: "userId" })
      userId: number;

  @Column("text", { name: "chiefEmail" })
      chiefEmail: string;

  @ManyToOne(() => Users, (users) => users.userChiefRelationsByChief, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "chiefEmail", referencedColumnName: "id" }])
      chief: Users;

  @ManyToOne(() => Users, (users) => users.userChiefRelationsByChief, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
      user: Users;
}

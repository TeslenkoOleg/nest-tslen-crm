import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { UsersGroup } from "./UsersGroup";
import { Users } from './Users';

@Index("userRelationToGroup_users_null_fk", ["userId"], {})
@Index("userRelationToGroup_usersGroup_null_fk", ["groupId"], {})
@Entity("userRelationToGroup", { schema: "tslen" })
export class UserRelationToGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("int", { name: "userId", nullable: true })
      userId: number | null;

  @Column("int", { name: "groupId", nullable: true })
      groupId: number | null;

  @ManyToOne(
      () => UsersGroup,
      (usersGroup) => usersGroup.userRelationToGroups,
      { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "groupId", referencedColumnName: "id" }])
      group: UsersGroup;

  @ManyToOne(() => Users, (users) => users.id, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
      user: Users;
}

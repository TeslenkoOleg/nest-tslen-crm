import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { Users } from './users.entity';
import { BaseAbstractEntity } from '../../../common/entities/base/base.abstract.entity';
import { UserGroup } from '../../user-group/entities/user-group.entity';

@Index("userRelationToGroup_users_null_fk", ["userId"], {})
@Index("userRelationToGroup_usersGroup_null_fk", ["groupId"], {})
@Entity("userRelationToGroup", { schema: "tslen" })
export class UserRelationToGroup extends BaseAbstractEntity<UserRelationToGroup>{

  @Column("int", { name: "userId", nullable: true })
  userId: number | null;

  @Column("int", { name: "groupId", nullable: true })
  groupId: number | null;

  @ManyToOne(
      () => UserGroup,
      (userGroup) => userGroup.userRelationToGroups,
      { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "groupId", referencedColumnName: "id" }])
  group: UserGroup;

  @ManyToOne(() => Users, (users) => users.id, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

}

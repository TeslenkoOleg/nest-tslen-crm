import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { UserRelationToGroup } from "./UserRelationToGroup";
import { Companies } from "../../../common/entities/Companies";

@Index("usersGroup_companies_null_fk", ["companyId"], {})
@Entity("usersGroup", { schema: "tslen" })
export class UsersGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("varchar", { name: "name", nullable: true, length: 250 })
      name: string | null;

  @Column("datetime", { name: "createdAt", nullable: true })
      createdAt: Date | null;

  @Column("varchar", { name: "permissions", nullable: true, length: 250 })
      permissions: string | null;

  @Column("int", { name: "companyId", nullable: true })
      companyId: number | null;

  @OneToMany(
      () => UserRelationToGroup,
      (userRelationToGroup) => userRelationToGroup.groupId
  )
      userRelationToGroups: UserRelationToGroup[];

  @ManyToOne(() => Companies, (companies) => companies.id, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
      company: Companies;
}

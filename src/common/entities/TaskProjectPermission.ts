import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaskProject } from "./TaskProject";
import { Users } from '../../resources/users/entities/Users';

@Index("taskProjectPermission_taskProject_id_fk", ["projectId"], {})
@Index("taskProjectPermission_users_id_fk", ["userId"], {})
@Entity("taskProjectPermission", { schema: "tslen" })
export class TaskProjectPermission {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "projectId" })
  projectId: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("enum", {
    name: "permission",
    nullable: true,
    enum: ["read", "write", "admin"],
  })
  permission: "read" | "write" | "admin" | null;

  @ManyToOne(
      () => TaskProject,
      (taskProject) => taskProject.taskProjectPermissions,
      { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "projectId", referencedColumnName: "id" }])
  project: TaskProject;

  @ManyToOne(() => Users, (users) => users.taskProjectPermissions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}

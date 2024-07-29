import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectPhasesRelation } from '../../../common/entities/ProjectPhasesRelation';
import { TaskProjectPermission } from '../../../common/entities/TaskProjectPermission';
import { Tasks } from '../../../common/entities/Tasks';

@Entity("taskProject")
export class TaskProject {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("int", { name: "companyId", nullable: true })
      companyId: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 250 })
      name: string | null;

  @Column("varchar", { name: "logo", nullable: true, length: 250 })
      logo: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 250 })
      description: string | null;

  @Column("varchar", { name: "slackChannel", nullable: true, length: 200 })
      slackChannel: string | null;

  @Column("int", { name: "isPrivate", nullable: true, default: () => "'0'" })
      isPrivate: number | null;

  @Column("datetime", { name: "createdAt", nullable: true })
      createdAt: Date | null;

  @Column("datetime", { name: "deletedAt", nullable: true })
      deletedAt: Date | null;

  @OneToMany(
      () => ProjectPhasesRelation,
      (projectPhasesRelation) => projectPhasesRelation.projectId
  )
      projectPhasesRelations: ProjectPhasesRelation[];

  @OneToMany(
      () => TaskProjectPermission,
      (taskProjectPermission) => taskProjectPermission.project,  { cascade: true }
  )
      taskProjectPermissions: TaskProjectPermission[];

  @OneToMany(() => Tasks, (tasks) => tasks.project)
      tasks: Tasks[];
}

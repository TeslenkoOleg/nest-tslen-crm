import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { TaskPhase } from "./TaskPhase";
import { TaskProject } from '../../resources/task-project/entities/task-project.entity';
import { TaskAttachments } from './TaskAttachments';
import { OrderInPhase } from './OrderInPhase';

@Index("tasks_taskPhase_id_fk", ["phaseId"], {})
@Index("tasks_taskProject_id_fk", ["projectId"], {})
@Entity("tasks", { schema: "tslen" })
export class Tasks {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("varchar", { name: "title", nullable: true, length: 500 })
      title: string | null;

  @Column("text", { name: "description", nullable: true })
      description: string | null;

  @Column("varchar", { name: "assignessEmail", nullable: true, length: 250 })
      assignessEmail: string | null;

  @Column("varchar", { name: "priority", length: 100 })
      priority: string | null;

  @Column("datetime", { name: "estimate", nullable: true })
      estimate: Date | null;

  @Column("datetime", { name: "createdAt", nullable: true })
      createdAt: Date | null;

  @Column("varchar", { name: "createdBy", nullable: true, length: 250 })
      createdBy: string | null;

  @Column("varchar", { name: "label", nullable: true, length: 250 })
      label: string | null;

  @Column("datetime", { name: "updatedAt", nullable: true })
      updatedAt: Date | null;

  @Column("int", { name: "phaseId", nullable: true })
      phaseId: number | null;

  @Column("int", { name: "projectId", nullable: true })
      projectId: number | null;

  @Column("int", { name: "orderId", nullable: true })
      orderId: number | null;

  @Column("enum", {
      name: "status",
      nullable: true,
      enum: ["unStatus", "inProgress", "hold", "test", "release", "done"],
  })
      status:
    | "unStatus"
    | "inProgress"
    | "hold"
    | "test"
    | "release"
    | "done"
    | null;

  @ManyToOne(() => TaskPhase, (taskPhase) => taskPhase.tasks, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })

  @JoinColumn([{ name: "phaseId", referencedColumnName: "id" }])
      phases: TaskPhase;

  @ManyToOne(() => TaskProject, (taskProject) => taskProject.tasks, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "projectId", referencedColumnName: "id" }])
      project: TaskProject;

  @OneToMany(() => TaskAttachments, (taskAttachments) => taskAttachments.task)
      taskAttachments: TaskAttachments[];

  @OneToOne(() => OrderInPhase, (orderInPhase) => orderInPhase.task)
      orderInPhases: OrderInPhase;
}

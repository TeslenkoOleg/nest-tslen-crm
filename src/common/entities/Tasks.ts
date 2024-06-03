import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { TaskPhase } from "./TaskPhase";
import { TaskProject } from "./TaskProject";

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
      phaseL: TaskPhase;

  @ManyToOne(() => TaskProject, (taskProject) => taskProject.tasks, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })

  @JoinColumn([{ name: "projectId", referencedColumnName: "id" }])
      project2: TaskProject;
}

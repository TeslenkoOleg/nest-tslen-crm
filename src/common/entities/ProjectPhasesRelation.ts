import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { TaskPhase } from "./TaskPhase";
import { TaskProject } from '../../resources/task-project/entities/task-project.entity';

@Index("projectPhasesRelation_taskPhase_id_fk", ["phaseId"], {})
@Index("projectPhasesRelation_taskProject_id_fk", ["projectId"], {})
@Entity("projectPhasesRelation", { schema: "tslen" })
export class ProjectPhasesRelation {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("int", { name: "projectId", nullable: true })
      projectId: number | null;

  @Column("int", { name: "phaseId", nullable: true })
      phaseId: number | null;

  @ManyToOne(() => TaskPhase, (taskPhase) => taskPhase.id, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "phaseId", referencedColumnName: "id" }])
      phase: TaskPhase;

  @ManyToOne(
      () => TaskProject,
      (taskProject) => taskProject.projectPhasesRelations,
      { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "projectId", referencedColumnName: "id" }])
      project: TaskProject;
}

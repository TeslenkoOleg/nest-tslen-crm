import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { TaskPhase } from "./TaskPhase";
import { Tasks } from "./Tasks";

@Index("orderInPhase_taskPhase_id_fk", ["phaseId"], {})
@Index("orderInPhase_tasks_id_fk", ["taskId"], {})
@Entity("orderInPhase", { schema: "tslen" })
export class OrderInPhase {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
        id: number;

    @Column("int", { name: "phaseId", nullable: true })
        phaseId: number | null;

    @Column("int", { name: "taskId", nullable: true })
        taskId: number | null;

    @Column("int", { name: "orderId", nullable: true })
        orderId: number | null;

    @ManyToOne(() => TaskPhase, (taskPhase) => taskPhase.id, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "phaseId", referencedColumnName: "id" }])
        phase: TaskPhase;

    @ManyToOne(() => Tasks, (tasks) => tasks.id, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "taskId", referencedColumnName: "id" }])
        task: Tasks;
}

import {
    Column,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Tasks } from './Tasks';
@Entity("taskAttachments", { schema: "tslen-crm" })
export class TaskAttachments {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
        id: number;

    @Column("int", { name: "taskId", nullable: true })
        taskId: number | null;

    @Column("varchar", { name: "name", nullable: true, length: 500 })
        name: string;

    @Column("varchar", { name: "url", length: 1100 })
        url: string;

    @Column("varchar", { name: "originName", length: 255, })
        originName: string;

    @Column("varchar", { name: "extension", nullable: true, length: 255, })
        extension: string | null;

    @Column("varchar", { name: "type", nullable: true, length: 255 })
        type: "string" | null;

    @ManyToOne(() => Tasks, (tasks) => tasks.taskAttachments, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "taskId", referencedColumnName: "id" }])
        task: Tasks;
}

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";



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


}

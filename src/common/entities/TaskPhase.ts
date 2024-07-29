import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tasks } from "./Tasks";

@Entity("taskPhase", { schema: "tslen" })
export class TaskPhase {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
      id: number;

  @Column("varchar", { name: "name", nullable: true, length: 250 })
      name: string | null;

  @Column("datetime", { name: "createdAt", nullable: true })
      createdAt: Date | null;

  @Column("datetime", { name: "deletedAt", nullable: true })
      deletedAt: Date | null;

  @Column("datetime", { name: "updatedAt", nullable: true })
      updatedAt: Date | null;

  @OneToMany(() => Tasks, (tasks) => tasks.phases)
      tasks: Tasks[];
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Empresa' })
export class Empresa {
    @PrimaryGeneratedColumn()
    public id_empresa: number;

    @Column({ length: 100 })
    public nombre: string;

    @Column({ length: 100, nullable: true })
    public nombre_sociedad: string;

    @Column({ length: 20, nullable: true })
    public telefono: string;

    @Column({ length: 100, nullable: true })
    public correo: string;

    @Column({ length: 50, nullable: true })
    public pais: string;

    @Column({ length: 50, nullable: true })
    public rubro_negocio: string;

    @Column({ type: 'int', nullable: true })
    public total_colaboradores: number;

    @CreateDateColumn()
    public fecha_creacion: Date;

    @UpdateDateColumn()
    public fecha_actualizacion: Date;
}
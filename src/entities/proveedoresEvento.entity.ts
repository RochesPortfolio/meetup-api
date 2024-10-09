import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { Empresa } from "./empresa.entity";
import { Evento } from "./evento.entity";
import { Proveedor } from "./proveedor.entity";

@Entity({ name: 'ProveedoresEvento' })
export class ProveedoresEvento {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Empresa)
    public id_empresa: Empresa;

    @ManyToOne(() => Proveedor)
    public id_proveedor: Proveedor;

    @ManyToOne(() => Evento)
    public id_evento: Evento;

    @Column()
    public monto_patrocinio: number;

    @CreateDateColumn()
    public fecha_creacion: Date;

    @UpdateDateColumn()
    public fecha_actualizacion: Date;
}
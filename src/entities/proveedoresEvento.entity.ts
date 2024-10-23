import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column, JoinColumn } from "typeorm";
import { Empresa } from "./empresa.entity";
import { Evento } from "./evento.entity";
import { Proveedor } from "./proveedor.entity";

@Entity({ name: 'ProveedoresEvento' })
export class ProveedoresEvento {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Empresa, (empresa) => empresa.id_empresa)
    @JoinColumn({ name: 'id_empresa' })
    public id_empresa: Empresa;

    @ManyToOne(() => Proveedor, (proveedor) => proveedor.id_proveedor)
    @JoinColumn({ name: 'id_proveedor' })
    public id_proveedor: Proveedor;

    @ManyToOne(() => Evento, (evento) => evento.id_evento)
    @JoinColumn({ name: 'id_evento' })
    public id_evento: Evento;

    @Column()
    public monto_patrocinio: number;

    @CreateDateColumn()
    public fecha_creacion: Date;

    @UpdateDateColumn()
    public fecha_actualizacion: Date;
}
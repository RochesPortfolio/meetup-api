import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { ProveedoresEvento } from "./proveedoresEvento.entity";
import { Evento } from "./evento.entity";

@Entity({ name: 'GastosEvento' })
export class GastosEvento {
    @PrimaryGeneratedColumn()
    public id_gasto: number;

    @ManyToOne(() => ProveedoresEvento, (proveedor) => proveedor.id_proveedor)
    @JoinColumn({ name: 'id_proveedor' })
    public id_proveedor: ProveedoresEvento;

    @ManyToOne(() => Evento, (evento) => evento.id_evento)
    @JoinColumn({ name: 'id_evento' })
    public id_evento: Evento;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    public total: number;

    @Column({ type: 'text', nullable: true })
    public comentarios: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    public descuento: number;

    @Column({ length: 50, nullable: true })
    public estado_pago: string;

    @CreateDateColumn()
    public fecha_creacion: Date;

    @UpdateDateColumn()
    public fecha_actualizacion: Date;
}
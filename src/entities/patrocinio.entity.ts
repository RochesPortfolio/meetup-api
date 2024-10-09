import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Evento } from "./evento.entity";
import { Patrocinador } from "./patrocinador.entity";

@Entity({ name: 'Patrocinio' })
export class Patrocinio {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Evento)
    public id_evento: Evento;

    @ManyToOne(() => Patrocinador)
    public id_patocinador: Patrocinador;

    @Column({ length: 50 })
    public rol: string;
}
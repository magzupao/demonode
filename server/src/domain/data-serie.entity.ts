/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A DataSerie.
 */
@Entity('data_serie')
export default class DataSerie extends BaseEntity {
  @Column({ type: 'integer', name: 'cod_station', nullable: true })
  codStation: number;

  @Column({ name: 'ts', nullable: true })
  ts: string;

  @Column({ name: 'temp', nullable: true })
  temp: string;

  @Column({ name: 'wind', nullable: true })
  wind: string;

  @Column({ name: 'prec', nullable: true })
  prec: string;

  @Column({ name: 'pres', nullable: true })
  pres: string;

  @Column({ name: 'hum', nullable: true })
  hum: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

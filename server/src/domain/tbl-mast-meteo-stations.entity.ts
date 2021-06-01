/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TblMastMeteoStations.
 */
@Entity('tbl_mast_meteo_stations')
export default class TblMastMeteoStations extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ type: 'decimal', name: 'longitude', precision: 10, scale: 2 })
  longitude: number;

  @Column({ type: 'decimal', name: 'latitude', precision: 10, scale: 2 })
  latitude: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

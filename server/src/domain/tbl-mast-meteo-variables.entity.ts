/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TblMastMeteoVariables.
 */
@Entity('tbl_mast_meteo_variables')
export default class TblMastMeteoVariables extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'unit' })
  unit: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

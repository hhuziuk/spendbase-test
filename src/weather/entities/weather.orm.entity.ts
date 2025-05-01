import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'weather' })
export class WeatherOrmEntity {
	@PrimaryGeneratedColumn('uuid')
	weatherId!: string;

	@Column({ type: 'double precision' })
	lat!: number;

	@Column({ type: 'double precision' })
	lon!: number;

	@Column({ type: 'text' })
	part!: string;

	@Column({ type: 'bigint' })
	sunrise!: number;

	@Column({ type: 'bigint' })
	sunset!: number;

	@Column({ type: 'real' })
	temp!: number;

	@Column({ type: 'real' })
	feels_like!: number;

	@Column({ type: 'integer' })
	pressure!: number;

	@Column({ type: 'integer' })
	humidity!: number;

	@Column({ type: 'real' })
	uvi!: number;

	@Column({ type: 'real' })
	wind_speed!: number;
}

import { EntityRepository, Repository, getRepository } from 'typeorm';

import { ICreateAppointmentDTO } from '@modules/appointments/dtos/create-appointment';
import { IAppointmentRepository } from '@modules/appointments/repositories';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';

@EntityRepository(Appointment)
export class AppointmentRepository implements IAppointmentRepository {
  private orm: Repository<Appointment>;

  constructor() {
    this.orm = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.orm.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.orm.create({ provider_id, date });
    this.orm.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository;

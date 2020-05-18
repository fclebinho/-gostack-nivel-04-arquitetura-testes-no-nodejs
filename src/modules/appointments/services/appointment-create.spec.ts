import 'reflect-metadata';

import { AppointmentCreateService } from '@modules/appointments/services';
import { AppointmentRepositoryFake } from '@modules/appointments/repositories';

import { ApplicationError } from '@shared/errors/application-error';

let appointmentRepository: AppointmentRepositoryFake;
let appointmentCreateService: AppointmentCreateService;

describe('AppointmentCreate', () => {
  beforeEach(() => {
    appointmentRepository = new AppointmentRepositoryFake();
    appointmentCreateService = new AppointmentCreateService(
      appointmentRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await appointmentCreateService.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create a new appointment on then same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await appointmentCreateService.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    await expect(
      appointmentCreateService.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});

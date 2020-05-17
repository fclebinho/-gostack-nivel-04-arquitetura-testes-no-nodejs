import 'reflect-metadata';

import { AppointmentCreateService } from '@modules/appointments/services';
import { AppointmentRepositoryFake } from '@modules/appointments/repositories';

import { ApplicationError } from '@shared/errors/application-error';

describe('AppointmentCreate', () => {
  it('should be able to create a new appointment', async () => {
    const repository = new AppointmentRepositoryFake();
    const service = new AppointmentCreateService(repository);

    const appointment = await service.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create a new appointment on then same time', async () => {
    const repository = new AppointmentRepositoryFake();
    const service = new AppointmentCreateService(repository);
    const appointmentDate = new Date(2020, 4, 10, 11);

    await service.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      service.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});

import 'reflect-metadata';

import { AppointmentRepositoryFake } from '@modules/appointments/repositories';
import { ProvidersDayAvailability } from '@modules/appointments/services';

let appointmentRepositoryFake: AppointmentRepositoryFake;
let providersDayAvailabilityListService: ProvidersDayAvailability;

describe('ProvidersDayAvailability', () => {
  beforeEach(() => {
    appointmentRepositoryFake = new AppointmentRepositoryFake();
    providersDayAvailabilityListService = new ProvidersDayAvailability(
      appointmentRepositoryFake,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await appointmentRepositoryFake.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await appointmentRepositoryFake.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await providersDayAvailabilityListService.execute({
      provider_id: 'user_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});

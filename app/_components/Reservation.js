import DateSelector from './DateSelector';
import LoginMessage from './LoginMessage';
import ReservationForm from './ReservationForm';

import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import { auth } from '../_lib/auth';

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px] mt-10'>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          settings={settings}
          user={session.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;

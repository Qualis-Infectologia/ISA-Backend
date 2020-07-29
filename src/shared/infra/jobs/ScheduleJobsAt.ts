import { container } from 'tsyringe';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';

export default function ScheduleJobsAt() {
  const queue = container.resolve<IQueueProvider>('QueueProvider');
  queue.schedule('UsersAccession', 'tomorrow at 03:00');
  queue.schedule('UsersApprovedNotApproved', 'tomorrow at 03:00');
  queue.schedule('UsersSymptoms', 'tomorrow at 03:00');
  queue.schedule('UsersSymptomsAllDiary', 'tomorrow at 03:00');
}

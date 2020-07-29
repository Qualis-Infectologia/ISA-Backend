import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import securityRouter from '@security/routes/security.routes';
import establishmentsRouter from '@establishments/infra/http/routes/establishments.routes';
import smsRouter from '@shared/container/providers/SmsProvider/infra/http/routes/sms.routes';
import mailerRouter from '@shared/container/providers/MailsProvider/infra/http/routes/mailer.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/Mails', mailerRouter);
routes.use('/Sms', smsRouter);
routes.use('/security', securityRouter);
routes.use('/establishments', establishmentsRouter);

export default routes;

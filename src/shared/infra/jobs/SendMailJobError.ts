import { container } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailJobErrorDTO from './dtos/ISendMailJobErrorDTO';

export default async function SendMailJobError({
  to,
  from,
  data,
}: ISendMailJobErrorDTO) {
  const mailProvider = container.resolve<IMailProvider>('MailProvider');
  const template = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'views',
    'ErrorJob.hbs',
  );
  await mailProvider.sendMail({
    subject: 'AVISO - Ocorreu um Erro!',
    templateData: {
      file: template,
      variables: data,
    },
    to,
    from,
  });
}

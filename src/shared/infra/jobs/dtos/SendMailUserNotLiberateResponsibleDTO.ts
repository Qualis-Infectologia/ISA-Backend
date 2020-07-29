import User from '@users/infra/typeorm/entities/User';

interface IContactMail {
  name: string;
  address: string;
}

export default interface SendMailUserNotLiberateResponsibleDTO {
  to: IContactMail;
  from: IContactMail;
  data: {
    name: string;
    attended: User;
    days: number;
    blocked_until: string;
    infecto: User;
  };
}

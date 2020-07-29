import User from '@users/infra/typeorm/entities/User';

interface IContactMail {
  name: string;
  address: string;
}

export default interface ISendMailUserNotApprovedDTO {
  to: IContactMail;
  from: IContactMail;
  data: {
    name: string;
    attended: User;
    symptoms: string[];
    responsible?: User[];
  };
}

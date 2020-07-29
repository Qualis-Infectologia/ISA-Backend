interface IContactMail {
  name: string;
  address: string;
}

export default interface ISendMailErrorDTO {
  to: IContactMail;
  from: IContactMail;
  data: any;
}

export default interface ICreateUserDiaryDTO {
  userId: string;
  smellLoss: boolean;
  tasteLoss: boolean;
  appetiteLoss: boolean;
  fatigue: boolean;
  fever: boolean;
  cough: boolean;
  diarrhea: boolean;
  soreThroat: boolean;
  shortnessOfBreath: boolean;
  nasalCongestion: boolean;
  headache: boolean;
  approved: boolean;
}

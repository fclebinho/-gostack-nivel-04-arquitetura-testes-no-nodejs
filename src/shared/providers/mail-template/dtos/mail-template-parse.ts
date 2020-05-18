interface IVariableTemplate {
  [key: string]: string | number;
}

export default interface IMailTemplateParse {
  template: string;
  variables: IVariableTemplate;
}

interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTempalteDTO {
  template: string;
  variables: ITemplateVariables;
}

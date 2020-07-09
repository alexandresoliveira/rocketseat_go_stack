import IParseMailtTemplateDTO from '@shared/container/providers/MainTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailtTemplateDTO): Promise<string>;
}

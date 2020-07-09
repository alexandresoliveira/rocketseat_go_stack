import IParseMailTemplateDTO from '@shared/container/providers/MainTemplateProvider/dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '@shared/container/providers/MainTemplateProvider/models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(data: IParseMailTemplateDTO): Promise<string> {
    return 'teste';
  }
}

export default FakeMailTemplateProvider;

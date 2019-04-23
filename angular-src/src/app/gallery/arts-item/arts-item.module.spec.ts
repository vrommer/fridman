import { ArtsItemModule } from './arts-item.module';

describe('ArtsItemModule', () => {
  let artsItemModule: ArtsItemModule;

  beforeEach(() => {
    artsItemModule = new ArtsItemModule();
  });

  it('should create an instance', () => {
    expect(artsItemModule).toBeTruthy();
  });
});

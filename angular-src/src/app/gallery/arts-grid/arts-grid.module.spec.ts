import { ArtsGridModule } from './arts-grid.module';

describe('ArtsGridModule', () => {
  let artsGridModule: ArtsGridModule;

  beforeEach(() => {
    artsGridModule = new ArtsGridModule();
  });

  it('should create an instance', () => {
    expect(artsGridModule).toBeTruthy();
  });
});

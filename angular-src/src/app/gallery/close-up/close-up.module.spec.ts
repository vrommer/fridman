import { CloseUpModule } from './close-up.module';

describe('CloseUpModule', () => {
  let closeUpModule: CloseUpModule;

  beforeEach(() => {
    closeUpModule = new CloseUpModule();
  });

  it('should create an instance', () => {
    expect(closeUpModule).toBeTruthy();
  });
});

import { FilmsPlayPage } from './app.po';

describe('films-play App', function() {
  let page: FilmsPlayPage;

  beforeEach(() => {
    page = new FilmsPlayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

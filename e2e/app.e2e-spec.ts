import { NextbookingAngular2Page } from './app.po';

describe('nextbooking-angular2 App', function() {
  let page: NextbookingAngular2Page;

  beforeEach(() => {
    page = new NextbookingAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

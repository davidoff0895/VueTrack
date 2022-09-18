interface MenuItem {
  title: string
  path: string
}

export default class MainMenu {
  private title: string;
  private path: string;

  constructor(menuItem: MenuItem) {
    this.title = menuItem.title
    this.path = menuItem.path
  }
}

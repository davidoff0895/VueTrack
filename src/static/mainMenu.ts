interface MenuItem {
  title: string
  path: string
  isGlobal: boolean
}

class MainMenu {
  protected menuItems: MenuItem[] = [
    { title: 'Issues', path: '/issues', isGlobal: true },
    { title: 'Dashboards', path: '/dashboard', isGlobal: false },
    { title: 'Agile Boards', path: '/agiles', isGlobal: true },
    { title: 'Reports', path: '/reports', isGlobal: true },
    { title: 'Projects', path: '/projects', isGlobal: false },
    { title: 'Timesheets', path: '/timesheets', isGlobal: false },
  ]
  get menu() {
    return this.menuItems;
  }
}

class GlobalMenu extends MainMenu {
  constructor() {
    super();
    this.menuItems = this.menuItems.filter(({ isGlobal }) => isGlobal);
  }
}

export const mainMenu = new MainMenu().menu;
export const globalMenu = new GlobalMenu().menu;

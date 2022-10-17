class AppMode {
  readonly LIGHT = 'light';
  readonly DARK = 'dark';
  readonly SYNC_OS = 'syncOs';
  public mode = this.SYNC_OS;
  private APP_MODE_LS_KEY = 'userAppMode';

  constructor() {
    let selectedUserMode = window.localStorage.getItem(this.APP_MODE_LS_KEY);
    if (!selectedUserMode) {
      selectedUserMode = this.SYNC_OS;
      window.localStorage.setItem(this.APP_MODE_LS_KEY, this.SYNC_OS);
    }
    this.mode = selectedUserMode;
  }

  get userPcMode(): string {
    const isDartMode = window.matchMedia('(prefers-color-scheme: dark)')
      .matches;
    return isDartMode ? this.DARK : this.LIGHT;
  }

  public setAppMode(mode: string): void {
    this.validateAppMode(mode);
    window.localStorage.setItem(this.APP_MODE_LS_KEY, mode);
    this.mode = mode;
  }

  private validateAppMode(mode: string) {
    const allowedAppModes = [this.LIGHT, this.DARK, this.SYNC_OS];
    if (![this.LIGHT, this.DARK, this.SYNC_OS].includes(mode)) {
      throw new Error(`unexpected mode ${mode}.
        Allowed modes: ${allowedAppModes}`);
    }
  }
}

export default new AppMode();

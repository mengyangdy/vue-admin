declare namespace StorageType {
  interface Session {
    themeColor:string
  }
  interface Local{
    token:string
    refreshToken:string
    themeColor:string
    darkMode:boolean
    themeSettings:App.Theme.ThemeSetting
  }
}
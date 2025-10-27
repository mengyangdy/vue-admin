declare namespace Api {
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      id: number | null;
      username: string;
      avatar?: string;
      email?: string;
      phone?: string;
      status: number;
      createdAt: string;
      updatedAt: string;
      roles: string[];
      buttons: string[];
    }
  }
}

import { UserAuthDto } from "./dto/user-auth.dto";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthService {
    private jwtService;
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    login(userAuthDto: UserAuthDto): Promise<number>;
    getUserInfo(id: number): Promise<{
        msg: string;
        data: {
            id: number;
            username: string;
            email: string | null;
            phone: string | null;
            avatar: string | null;
            nickname: string | null;
            status: number | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        token: string;
        refresh_token: string;
    }>;
}

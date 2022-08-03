export interface User
{
    id: string;
    username: string;
    email: string;
    avatar?: string;
    status?: string;
    provider?: string;
    confirmed: boolean;
    blocked: boolean;
}

import { Identity } from '@astarx-studio/react-core/auth';

type AuthPayload = {
  username: string;
  password: string;
};
type LoginResponse = AuthPayload & {
  grants: Identity[];
};
export declare const login: (dumdum: AuthPayload) => Promise<LoginResponse>;
export declare const logout: (dumdum: AuthPayload) => Promise<AuthPayload>;

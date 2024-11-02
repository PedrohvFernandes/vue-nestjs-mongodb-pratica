import * as z from 'zod';
declare const userSchema: z.ZodObject<{
    username: z.ZodString;
    githubUser: z.ZodString;
    accessToken: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username?: string;
    githubUser?: string;
    accessToken?: string;
}, {
    username?: string;
    githubUser?: string;
    accessToken?: string;
}>;
export type userType = z.infer<typeof userSchema>;
export declare class User {
    private readonly user;
    private readonly _id;
    private readonly createdAt;
    private updatedAt?;
    get valuesUser(): userType;
    private validateUser;
    constructor(user: userType, id?: string, createdAt?: Date, updatedAt?: Date | null);
    get id(): string;
    get createdAtUser(): Date;
    get updatedAtUser(): Date | null;
    set updatedAtUser(updatedAt: Date | null);
    get accessToken(): string;
    get username(): string;
    get githubUser(): string;
    set username(username: string);
    set githubUser(githubUser: string);
}
export {};

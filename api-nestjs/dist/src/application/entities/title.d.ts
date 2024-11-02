import * as z from 'zod';
declare const titleSchema: z.ZodObject<{
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title?: string;
}, {
    title?: string;
}>;
export type titleType = z.infer<typeof titleSchema>;
export declare class Title {
    private readonly title;
    get value(): string;
    private validateTitle;
    constructor(title: string);
}
export {};

import * as z from 'zod';
declare const contentSchema: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content?: string;
}, {
    content?: string;
}>;
export type contentType = z.infer<typeof contentSchema>;
export declare class Content {
    private readonly content;
    get value(): string;
    private validateContent;
    constructor(content: string);
}
export {};

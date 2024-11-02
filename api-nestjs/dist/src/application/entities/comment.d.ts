import { Replace } from '@helpers/Replace';
import { Content } from './content';
import { Title } from './title';
export type CommentProps = {
    userId: string;
    content: Content;
    title: Title;
    createdAt: Date;
    updatedAt?: Date | null;
};
export declare class Comment {
    private readonly _id;
    private readonly comment;
    constructor(comment: Replace<CommentProps, {
        createdAt?: Date;
    }>, id?: string);
    get valuesComment(): CommentProps;
    get content(): Content;
    set content(content: Content);
    get contentValue(): string;
    get title(): Title;
    set title(title: Title);
    get titileValue(): string;
    get propsComment(): CommentProps;
    get userId(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    set updatedAt(updatedAt: Date | null);
    get id(): string;
}

export interface CreatePostParams {
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    category: string[];
    subcategory?: string;
    brand: string;
    quantity: number;
    creator: string;
    ownerId: unknown;
    ownerRole: string;
    images?: {
        url: string;
        alt: string;
    }[];
    tags?: string[];
    weight?: number;
}
export declare const createPost: (params: CreatePostParams) => Promise<import("mongoose").Document<unknown, {}, import("../schemas/post.schema").IPost> & import("../schemas/post.schema").IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const getPosts: () => Promise<(import("mongoose").Document<unknown, {}, import("../schemas/post.schema").IPost> & import("../schemas/post.schema").IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
})[] | undefined>;
export declare const getPostById: (id: unknown) => Promise<(import("mongoose").Document<unknown, {}, import("../schemas/post.schema").IPost> & import("../schemas/post.schema").IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const updatePost: (id: unknown, params: CreatePostParams) => Promise<(import("mongoose").Document<unknown, {}, import("../schemas/post.schema").IPost> & import("../schemas/post.schema").IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const deletePost: (id: unknown) => Promise<(import("mongoose").Document<unknown, {}, import("../schemas/post.schema").IPost> & import("../schemas/post.schema").IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;

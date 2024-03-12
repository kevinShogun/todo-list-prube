export interface Todo{
    id: string;
    title: string;
    body: string;
    done?: boolean;
    categories: Category[];
}

export interface Category {
    id: string;
    name: string;
    color: string;
}

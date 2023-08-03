export interface User {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface Users {
    total_count: number;
    items: Array<User>;
}

export interface INotionUser {
    object: "user";
    id: string;
    name: string;
    avatar_url: string | null;
    type: "person" | "bot";
    person?: {
        email: string;
    };
    bot?: {
        owner: {
            type: "workspace";
            workspace: boolean;
        };
        workspace_name: string;
    };
}

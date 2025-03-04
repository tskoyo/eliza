import { INotionUser } from "./INotionUser";

export interface INotionUserListResponse {
    object: "list";
    results: INotionUser[];
    next_cursor: string | null;
    has_more: boolean;
    type: "user";
    user: Record<string, unknown>; // Empty object in the response
    developer_survey: string;
    request_id: string;
}

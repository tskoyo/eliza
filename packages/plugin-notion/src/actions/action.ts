import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { INotionUserListResponse } from "../interfaces/INotionListResponse";

const DEFAULT_TIMEOUT = 30000; // 30 seconds
const BASE_URL = "https://api.notion.com";
const VERSION = "/v1";
const NOTION_VERSION = "2022-06-28";

export function validateNotionApiKey(): string {
    const apiKey = process.env.NOTION_API_KEY;
    if (!apiKey) {
        throw new Error("Notion API key not set");
    }

    return apiKey;
}

export async function sendNotionGetRequest(
    apiKey: string,
    urlPath: string
): Promise<INotionUserListResponse> {
    try {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Notion-Version": NOTION_VERSION,
                "Content-Type": "application/json",
            },
            timeout: DEFAULT_TIMEOUT,
        };
        const url = BASE_URL + VERSION + urlPath;
        return (await axios.get(url, config)).data;
    } catch (error) {
        return error;
    }
}

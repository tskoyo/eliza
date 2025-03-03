import { composeContext, generateMessageResponse } from "@elizaos/core";
import {
    Action,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    elizaLogger,
} from "@elizaos/core";
import axios, { type AxiosRequestConfig } from "axios";

const NOTION_API_KEY = "";
const DEFAULT_TIMEOUT = 30000; // 30 seconds
const BASE_URL = "https://api.notion.com";
const VERSION = "/v1";

export const listAllUsers: Action = {
    name: "LIST_ALL_USERS",
    description: "Lists all users within the workspace",
    similes: [],
    examples: [],
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        try {
            const config: AxiosRequestConfig = {
                headers: {
                    Authorization: `Bearer ${NOTION_API_KEY}`,
                    "Notion-Version": "2022-06-28",
                    "Content-Type": "application/json",
                },
                timeout: DEFAULT_TIMEOUT,
            };
            const url = BASE_URL + VERSION + "/users";
            const response = await axios.get(url, config);

            const users = response.data.results
                .map((user) => user.name)
                .join(", ");

            let currentState: State = state;
            if (!currentState) {
                currentState = (await runtime.composeState(message)) as State;
            }
            currentState = await runtime.updateRecentMessageState(currentState);

            if (callback) {
                callback({
                    text: `Here are the users in your Notion workspace: ${users}`,
                    content: users,
                });
            }
            return true;
        } catch (error) {
            elizaLogger.error("Error in LIST_ALL_USERS handler:", error);

            callback({
                text: `Error fetching users: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }
    },
    validate: async (runtime, _message) => {
        return !!runtime.getSetting("NOTION_API_KEY");
    },
};

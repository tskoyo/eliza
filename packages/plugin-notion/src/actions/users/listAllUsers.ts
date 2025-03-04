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

import { sendNotionGetRequest, validateNotionApiKey } from "../action";

export const listAllUsers: Action = {
    name: "LIST_ALL_USERS",
    description: "Lists all users within the workspace",
    similes: [],
    examples: [],
    suppressInitialMessage: true,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const apiKey = validateNotionApiKey();

        if (!apiKey) {
            elizaLogger.error("Invalid api key");
            return;
        }

        const response = await sendNotionGetRequest(apiKey, "/users");

        const users = response.results.map((user) => user.name).join(", ");

        callback({
            text: `Here are the users in your Notion workspace: ${users}`,
            content: users,
        });
        return true;
    },
    validate: async (runtime, _message) => {
        return !!runtime.getSetting("NOTION_API_KEY");
    },
};

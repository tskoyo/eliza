import type { Plugin } from "@elizaos/core";
import { listAllUsers } from "./actions/users/listAllUsers";

export const notionPlugin: Plugin = {
    name: "notion",
    description: "Notion plugin",
    actions: [listAllUsers],
};

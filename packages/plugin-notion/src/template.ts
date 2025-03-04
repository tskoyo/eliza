export const listAllUsersTemplate = `
Respond with a JSON object containing a list of users in the Notion workspace.  
If an error occurs or no users are found, respond with an error message.  

The response must include:  
- users: An array of user names  

Example response:  
\`\`\`json
{  
    "users": ["Alice", "Bob", "Charlie"]  
}
\`\`\`
{{recentMessages}}
Retrieve the list of users from the Notion workspace.
Respond with a JSON markdown block containing the users array.
`;

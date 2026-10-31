import { Agent } from "@mastra/core/agent";
import { governMastraTools } from "@atensec/thoth/mastra";
import { lookupOrder, sendRefund } from "./tools.js";

// Build the agent per request, for the user it serves. Each tool call is
// checked with Thoth before the tool runs.
function supportAgent(userId: string) {
  return new Agent({
    id: "support-agent",
    name: "Support agent",
    instructions: "Help customers with their orders. Use the tools to look up and refund orders.",
    model: "openai/gpt-5-mini",
    tools: governMastraTools(
      { lookupOrder, sendRefund },
      {
        agentId: "support-agent",
        tenantId: process.env.THOTH_TENANT_ID!,
        approvedScope: [],
        userId,
      },
    ),
  });
}

const prompt = process.argv.slice(2).join(" ") || "Order A-1 arrived damaged. Please refund it.";
const result = await supportAgent("alice@example.com").generate(prompt, { maxSteps: 5 });

for (const step of result.steps ?? []) {
  for (const part of step.content ?? []) {
    if (part.type === "tool-result") console.log(`tool ${part.toolName}:`, JSON.stringify(part.output));
  }
}
console.log(`\n${result.text}`);

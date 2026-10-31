import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// Stand-ins for your own systems.
const orders = new Map([["A-1", { orderId: "A-1", status: "delivered", total: 40 }]]);

export const lookupOrder = createTool({
  id: "lookup-order",
  description: "Look up an order by ID",
  inputSchema: z.object({ orderId: z.string() }),
  execute: async ({ orderId }) => orders.get(orderId) ?? { error: "No such order" },
});

export const sendRefund = createTool({
  id: "send-refund",
  description: "Refund an order",
  inputSchema: z.object({ orderId: z.string(), amount: z.number() }),
  execute: async ({ orderId, amount }) => {
    console.log(`(refund of ${amount} on ${orderId} would be sent here)`);
    return { orderId, refunded: amount };
  },
});

# Thoth + Mastra example

A [Mastra](https://mastra.ai) support agent with two tools, `lookupOrder` and
`sendRefund`, whose tool calls are checked by [Thoth](https://atensecurity.com)
before they run. Thoth allows a call, denies it, or holds it for a person to
approve, and records each decision.

The integration is one call, `governMastraTools`, in [`src/index.ts`](src/index.ts).
The guide is at [docs.atensecurity.com/docs/sdks/mastra](https://docs.atensecurity.com/docs/sdks/mastra).

## Run it

1. Register an agent with the ID `support-agent` in your Thoth workspace, in
   observe mode, and create a runtime key for it
   ([quickstart](https://docs.atensecurity.com/docs/getting-started/quickstart)).
2. Copy `.env.example` to `.env` and fill it in.
3. Install and run:

   ```bash
   npm install
   node --env-file=.env --import tsx src/index.ts
   ```

The agent looks up order A-1 and tries to refund it. In observe mode both calls
run, and Thoth records what it would have decided; you'll see them in Activity.
Switch the agent to enforce, and a refund your policy denies never runs: Mastra
gives the model the refusal as the tool's error, and the agent tells the user.

Try your own request:

```bash
node --env-file=.env --import tsx src/index.ts "Where is order A-1?"
```

## Versions

Built against `@atensec/thoth` 0.2.0 and `@mastra/core` 1.81.0.

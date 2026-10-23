import React from "react";
import Link from "@docusaurus/Link";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import DocsLayout from "@site/src/components/DocsLayout/DocsLayout";
import CopyableCode from "@site/src/components/CopyableCode/CopyableCode";
import { getSidebarSections } from "@site/src/sidebarConfig";
import styles from "./api.module.css";

const SERVER_URL = "https://mcp.induslabs.io/mcp";
const CONSOLE_URL = "https://playground.induslabs.io/mcp-console";

const claudeCodeCommand = `claude mcp add --transport http indus ${SERVER_URL} \\
  --header "Authorization: Bearer indus_pat_..."`;

const cursorConfig = `{
  "mcpServers": {
    "indus": {
      "url": "${SERVER_URL}",
      "headers": { "Authorization": "Bearer indus_pat_..." }
    }
  }
}`;

const tools = [
  ["Discover", [
    ["list_options", "List agent options", "Voices, languages, LLM, STT and guardrail choices you can use.", "Read"],
    ["list_agents", "List agents", "Agents in your workspace.", "Read"],
    ["get_agent", "Get agent", "One agent and its live configuration.", "Read"],
    ["list_config_versions", "List config versions", "Published and draft versions of an agent.", "Read"],
    ["get_config_version", "Get config version", "One configuration version in full.", "Read"],
    ["diff_config_versions", "Compare config versions", "What changed between two versions.", "Read"],
  ]],
  ["Build", [
    ["create_agent", "Create agent", "A new agent (it gets no phone numbers or traffic).", "Write"],
    ["create_config_draft", "Create config draft", "A draft version; the live version is untouched.", "Write"],
    ["update_config_draft", "Update config draft", "Change a draft: prompt, voice, language, models. Overwrites the draft's current values.", "Overwrite"],
    ["validate_config", "Validate config", "Check a version for problems.", "Read"],
    ["render_preview", "Preview rendered prompt", "The prompt the agent will use, with variables filled in.", "Read"],
    ["enhance_prompt", "Suggest prompt improvements", "Suggested prompt changes for a version.", "Read"],
  ]],
  ["Publish", [
    ["prepare_publish", "Prepare publish", "The changes and warnings, and a confirmation for publishing.", "Read"],
    ["prepare_revert_last_publish", "Prepare revert of last publish", "Same, for going back to the previous version.", "Read"],
    ["publish", "Publish agent version", "Make a prepared version live. Needs your approval.", "Destructive"],
  ]],
  ["Gem builder", [
    ["gem_start", "Start Gem builder", "Start a guided agent-building session.", "Write"],
    ["gem_answer", "Answer Gem question", "Answer the builder's next question.", "Write"],
    ["gem_update_brief", "Update Gem brief", "Replace the agent brief with an edited copy.", "Overwrite"],
    ["gem_gaps", "Answer Gem build gaps", "Answer the details a build is missing; starts a rebuild.", "Write"],
    ["gem_build", "Build agent with Gem", "Generate the agent from the brief.", "Write"],
    ["gem_status", "Get Gem session status", "Progress of a Gem session.", "Read"],
    ["gem_create_agent", "Create agent from Gem", "Save the generated agent to your workspace.", "Write"],
  ]],
  ["Calls", [
    ["list_recent_calls", "List recent calls", "Recent calls for an agent.", "Read"],
    ["get_transcript", "Get call transcript", "A call's transcript, with phone numbers and emails masked.", "Read"],
    ["get_test_call_link", "Get test call link", "A dashboard link to talk to the agent in your browser.", "Read"],
  ]],
];

const examples = [
  ["Build an agent from a description",
    "\"Create a Hindi and English voice agent for Sharma Dental that books, moves and cancels appointments. Use a warm female voice.\"",
    "Claude checks the available voices and languages, creates the agent and a draft, validates it, and gives you a link to test it in your browser."],
  ["Improve an agent from real calls",
    "\"Read the last 10 calls of my collections agent and tell me where callers got confused. Then fix the prompt in a draft.\"",
    "Claude reads the transcripts, summarises the problems, and writes the fixes into a new draft. Your live agent is not changed."],
  ["Publish safely, or go back",
    "\"Show me what changed in the draft and publish it if it looks right.\" or \"Undo the last publish.\"",
    "Claude shows the differences and any warnings, asks you to approve, and only then publishes. Reverting uses the same approval step."],
];

const steps = (items) => (
  <ol>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ol>
);

export default function McpServer() {
  return (
    <DocsLayout
      title="Indus Labs MCP Server"
      description="Connect Claude, ChatGPT, Cursor and other AI assistants to Indus Labs and build, test and publish voice agents by chatting."
      sidebarSections={getSidebarSections("mcp")}
    >
      <section id="mcp-introduction" className={styles.pageIntro}>
        <h1>Indus Labs MCP Server</h1>
        <p>
          The Indus Labs MCP server lets you build, test and improve your
          voice agents from the AI assistant you already use: Claude,
          ChatGPT, Cursor or any client that supports the{" "}
          <a href="https://modelcontextprotocol.io">Model Context Protocol</a>.
          Describe the agent you want, and the assistant creates it, writes
          drafts, checks them, reads your call transcripts and, with your
          approval, publishes the changes.
        </p>
        <div className={styles.callout}>
          <strong>Server URL</strong>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            <code>{SERVER_URL}</code>
          </p>
        </div>
        <p>
          You need an Indus Labs account. Sign up or log in at{" "}
          <a href="https://playground.induslabs.io">playground.induslabs.io</a>.
          The assistant can only see and change agents in your own workspace.
        </p>
      </section>

      <section id="mcp-connect" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Connect your assistant</h2>
          <p>
            Claude and ChatGPT sign you in with your Indus Labs account
            (OAuth). Developer tools such as Claude Code and Cursor use a
            personal access token, which you create in the{" "}
            <a href={CONSOLE_URL}>MCP console</a>.
          </p>
        </div>

        <Tabs
          defaultValue="claude"
          values={[
            { label: "Claude (web & desktop)", value: "claude" },
            { label: "ChatGPT", value: "chatgpt" },
            { label: "Claude Code", value: "claude-code" },
            { label: "Cursor & others", value: "cursor" },
          ]}
        >
          <TabItem value="claude">
            {steps([
              <>In Claude, open <strong>Settings → Connectors</strong>.</>,
              <>Find <strong>Indus Labs</strong> in the directory and click <strong>Connect</strong>. If you don't see it, click <strong>Add custom connector</strong> and enter <code>{SERVER_URL}</code>.</>,
              <>Log in to Indus Labs and click <strong>Allow</strong>.</>,
              <>In a new chat, turn on the Indus Labs connector from the <strong>+</strong> menu and ask Claude to list your agents.</>,
            ])}
            <p>
              On Team and Enterprise plans, an Owner may need to add the
              connector for the organization first.
            </p>
          </TabItem>
          <TabItem value="chatgpt">
            {steps([
              <>In ChatGPT, open <strong>Settings → Apps &amp; Connectors → Advanced settings</strong> and turn on <strong>Developer mode</strong>.</>,
              <>Click <strong>Create</strong>, name it Indus Labs, enter <code>{SERVER_URL}</code> and choose <strong>OAuth</strong>.</>,
              <>Log in to Indus Labs and click <strong>Allow</strong>.</>,
              <>In a new chat, pick the Indus Labs connector and ask it to list your agents.</>,
            ])}
          </TabItem>
          <TabItem value="claude-code">
            {steps([
              <>Open the <a href={CONSOLE_URL}>MCP console</a> and create a personal access token. It is shown once, so copy it.</>,
              <>Run this command with your token:</>,
            ])}
            <CopyableCode language="bash">{claudeCodeCommand}</CopyableCode>
          </TabItem>
          <TabItem value="cursor">
            <p>
              Create a personal access token in the{" "}
              <a href={CONSOLE_URL}>MCP console</a>, then add the server to{" "}
              <code>~/.cursor/mcp.json</code> (or your client's MCP
              settings):
            </p>
            <CopyableCode language="json">{cursorConfig}</CopyableCode>
          </TabItem>
        </Tabs>
      </section>

      <section id="mcp-examples" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>What you can ask</h2>
        </div>
        {examples.map(([title, prompt, result]) => (
          <div key={title} style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ marginBottom: "0.25rem" }}>{title}</h3>
            <p style={{ margin: "0 0 0.25rem 0" }}><em>{prompt}</em></p>
            <p style={{ margin: 0 }}>{result}</p>
          </div>
        ))}
      </section>

      <section id="mcp-tools" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Tools</h2>
          <p>
            <strong>Read</strong> tools change nothing. <strong>Write</strong>{" "}
            tools create agents, drafts or Gem sessions but never change a
            live agent. <strong>Overwrite</strong> tools replace a draft or
            brief in place, and <strong>Destructive</strong> means it changes
            what your callers hear. Your assistant asks you before either.
          </p>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.parameterTable}>
            <thead>
              <tr>
                <th>Tool</th>
                <th>What it does</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {tools.map(([group, rows]) => (
                <React.Fragment key={group}>
                  <tr>
                    <td colSpan={3}><strong>{group}</strong></td>
                  </tr>
                  {rows.map(([name, title, what, kind]) => (
                    <tr key={name}>
                      <td>
                        {title}
                        <br />
                        <code>{name}</code>
                      </td>
                      <td>{what}</td>
                      <td>{kind}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="mcp-publishing" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>How publishing stays safe</h2>
        </div>
        <ul>
          <li>Changes go into a draft first. Your live agent keeps running unchanged until you publish.</li>
          <li>Publishing takes two steps. The assistant prepares the publish, shows you what changed and any warnings, and publishes only after you approve.</li>
          <li>The confirmation expires after 10 minutes and stops working if the draft changes, so you always approve exactly what goes live.</li>
          <li>Your agent always has a published version. If something is wrong, ask the assistant to undo the last publish.</li>
          <li>The assistant can't delete agents, buy numbers, start campaigns, place real calls or touch billing.</li>
        </ul>
      </section>

      <section id="mcp-permissions" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Permissions</h2>
          <p>When you connect, you approve these permissions for that app:</p>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.parameterTable}>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Allows</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>agents:read</code></td><td>See your agents, versions and options.</td></tr>
              <tr><td><code>agents:write</code></td><td>Create agents and drafts.</td></tr>
              <tr><td><code>agents:publish</code></td><td>Publish a version or undo a publish, after your approval.</td></tr>
              <tr><td><code>gem:use</code></td><td>Use the Gem agent builder.</td></tr>
              <tr><td><code>calls:read</code></td><td>Read your recent calls and transcripts.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="mcp-privacy" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Data and privacy</h2>
        </div>
        <ul>
          <li>The assistant only sees agents and calls in your own workspace.</li>
          <li>Phone numbers and email addresses in transcripts are masked before they reach the assistant.</li>
          <li>The MCP server doesn't store your data. Requests go straight to the Indus Labs platform, which keeps an audit log of changes made through the MCP server.</li>
          <li>Access tokens expire after an hour and are refreshed automatically. Personal access tokens expire after 90 days.</li>
          <li>
            See our <a href="https://induslabs.io/privacy-policy">privacy policy</a> and{" "}
            <a href="https://induslabs.io/terms-and-conditions">terms and conditions</a>.
          </li>
        </ul>
      </section>

      <section id="mcp-disconnect" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Disconnect</h2>
          <p>
            Open the <a href={CONSOLE_URL}>MCP console</a>. Under{" "}
            <strong>Connected apps</strong>, revoke the app or token. It
            stops working at once. You can also remove the connector in your
            assistant's settings.
          </p>
        </div>
      </section>

      <section id="mcp-troubleshooting" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Troubleshooting</h2>
        </div>
        <ul>
          <li><strong>"Your Indus Labs credential is invalid or expired"</strong>: disconnect and connect again, or create a new personal access token.</li>
          <li><strong>"Rate limited"</strong>: wait for the time in the message and try again. There are daily limits on creating agents, drafts and publishes.</li>
          <li><strong>The agent isn't found</strong>: the assistant can only use agents your account owns.</li>
        </ul>
        <p>
          Need help? Email <a href="mailto:hello@induslabs.io">hello@induslabs.io</a>.
          To build agents with code instead, see the{" "}
          <Link to="/developer-agent-management">Agent Management APIs</Link>.
        </p>
      </section>
    </DocsLayout>
  );
}

import OpenAI from "openai";

type AgentConfig = {
  name: string;
  description: string;
  prompt: string;
};

export async function generateAgentConfig(userInput: string): Promise<AgentConfig> {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return {
      name: "New AI Assistant",
      description: `Assistant generated from: ${userInput}`,
      prompt: `You are a helpful assistant. Task: ${userInput}`
    };
  }

  const openai = new OpenAI({ apiKey: key });
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Generate JSON only with keys: name, description, prompt for a useful personal AI assistant agent configuration."
      },
      { role: "user", content: userInput }
    ],
    temperature: 0.7,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No content returned from OpenAI");

  const parsed = JSON.parse(content) as AgentConfig;
  return {
    name: parsed.name || "AI Assistant",
    description: parsed.description || "Generated assistant",
    prompt: parsed.prompt || `Help user with: ${userInput}`
  };
}

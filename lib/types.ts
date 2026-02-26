export type User = {
  id: number;
  email: string;
  password: string;
};

export type Agent = {
  id: number;
  name: string;
  description: string;
  prompt: string;
  model: "GPT-4" | "GPT-4-mini";
  status: "Active" | "Paused";
  createdAt: string;
};

export type ToolConnection = {
  id: number;
  name: "Gmail" | "Calendar" | "Google Sheets";
  connected: boolean;
};

export type Log = {
  id: number;
  agentName: string;
  action: string;
  status: string;
  timestamp: string;
};

export type Database = {
  users: User[];
  agents: Agent[];
  tools: ToolConnection[];
  logs: Log[];
};

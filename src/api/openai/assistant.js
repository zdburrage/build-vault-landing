import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();
// Get API key from environment variables
const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OpenAI API key is required. Please set either OPENAI_API_KEY or VITE_OPENAI_API_KEY in your .env file.');
}

const openai = new OpenAI({
  apiKey: apiKey,
});

export async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { thread_id, message, api_key, assistant_id } = req.body;

    if (!api_key || !assistant_id) {
      return res.status(400).json({ error: "API key and assistant ID are required" });
    }

    const openai = new OpenAI({
      apiKey: api_key,
    });

    // Create a new thread if one doesn't exist
    let currentThreadId = thread_id;
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    // Add the message to the thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: "user",
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: assistant_id,
    });

    // Wait for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    while (runStatus.status === "in_progress" || runStatus.status === "queued") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    }

    if (runStatus.status === "completed") {
      // Get the latest message from the assistant
      const messages = await openai.beta.threads.messages.list(currentThreadId);
      const latestMessage = messages.data[0];
      const content = latestMessage.content[0];

      if (content.type === 'text') {
        return res.status(200).json({
          content: content.text.value,
          thread_id: currentThreadId,
        });
      } else {
        throw new Error('Unexpected message content type');
      }
    } else {
      throw new Error(`Run failed with status: ${runStatus.status}`);
    }
  } catch (error) {
    console.error("Error in OpenAI assistant API:", error);
    return res.status(500).json({ error: "Failed to generate estimate" });
  }
} 
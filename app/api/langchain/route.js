import { APIKey } from "../../../.env.local";
import { NextResponse } from "next/server";
// import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createRetrieverTool } from "langchain/agents/toolkits";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { Document } from "langchain/document";
import { OpenAIAgentTokenBufferMemory } from "langchain/agents/toolkits";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

const runRetrievalAgent = async (propmt) => {
    let str = `Oscar Ngai
    His full name is Ngai Tsz Hin Oscar. He is studying computer science at The Chinese University of Hong Kong.
    He has a overall 4.3 GPA. Has award deanlist serveral times.
    He likes playing video games and watching movies.
    he alwalys have a quote favourite about "I love programming" and studied 100 courses related computer science
    he is 190cm tall
    His favourite courses are CSCI2720 Building Web Applications and CSCI3170 Introduction to Database Systems
    he says that Tom Ho is a very smart guy and rich`;

    const data = new Document({ pageContent: str });
    // console.log(data);
    const textSplitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 1000,
        chunkOverlap: 20
    });
    const docs = await textSplitter.splitDocuments([data]);
    console.log(docs)
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({openAIApiKey: APIKey}));
    const retriever = vectorStore.asRetriever();

    const tool = createRetrieverTool(retriever, {
        name: "search_doc",
        description: "Useful when you think you don't have enugh information or lack of context to answer the question.",
    });
    const tools = [tool];
    
    const model = new ChatOpenAI({
        openAIApiKey: APIKey,
        modelName: "gpt-3.5-turbo",
        temperature: 0,
    });
    const memory = new OpenAIAgentTokenBufferMemory({
        llm: model,
        memoryKey: "chat_history",
        outputKey: "output"
      });
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "openai-functions",
    memory: memory,
    returnIntermediateSteps: true,
    agentArgs: {
        prefix:
        `You are an AI academic asistant who answer academic related questions. Do your best to answer the questions. You answer always short and precise.
        Feel free to use any tools available to look up relevant information, only if necessary.`,
        },
    });
    const result = await executor.call({
        input: "According to the document, what do Oscar describe about tom?"
    });
    console.log(result["output"]);
    return result["output"];
};

const callAI = async (propmt) => {
  const llm = new OpenAI({
    openAIApiKey: APIKey,
    modelName: "gpt-3.5-turbo",
    temperature: 0,
  });
  const result = await llm.predict(propmt);
  console.log(result);
  // output is normal string when using OpenAI not Chat
  return result;
};

export async function POST(req) {
  //get data from req body
  const { prompt } = await req.json();
  console.log(prompt);

  // const result = await callAI(prompt);
  const result = await runRetrievalAgent(prompt);
  return NextResponse.json({ API: APIKey, result: result });
}

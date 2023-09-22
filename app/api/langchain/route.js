import {APIKey} from '../../../.env.local';
import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";

// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { HNSWLib } from "langchain/vectorstores/hnswlib";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { createRetrieverTool } from "langchain/agents/toolkits";
// import { ChatOpenAI } from "langchain/chat_models/openai";

const runRetrievalAgent = async (propmt) => {

}

const callAI = async (propmt) => {
    const llm = new OpenAI({
        openAIApiKey: APIKey,
        modelName: "gpt-3.5-turbo",
        temperature: 0
      });
    const result = await llm.predict(propmt);
    console.log(result);
    // output is normal string when using OpenAI not Chat
    return result;
}

export async function POST(req) {
    //get data from req body
    const { prompt } = await req.json();
    console.log(prompt);


    const result = await callAI(prompt);
    return NextResponse.json({API: APIKey, result: result});
}
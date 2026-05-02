import { MeiliSearch } from "meilisearch";
import dotenv from "dotenv";

dotenv.config();


const client = new MeiliSearch({
    host: process.env.MEILI_HOST, // Meilisearch server
    apiKey: process.env.MEILI_MASTER_KEY,  
});

export default client;
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
    host: "http://localhost:7700", // Meilisearch server
    // apiKey: "your-master-key",   // optional, for production
});

export default client;
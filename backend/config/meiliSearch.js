import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
    host: "http://localhost:7700", // Meilisearch server
    // apiKey: "our-master-key",   //  TODO
});

export default client;
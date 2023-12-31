import { createClient, NormalizeOAS } from "fets";
import type { openapi } from "./openapi";

export const client = createClient<NormalizeOAS<typeof openapi>>({
  endpoint: "https://api.spotify.com/v1",
});

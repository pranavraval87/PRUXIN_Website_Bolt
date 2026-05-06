import Vapi from "@vapi-ai/web"

export const ASSISTANT_ID = "5c5f6718-d63c-4fdb-9ba0-06fed7aa5af7"

export const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY ?? "")

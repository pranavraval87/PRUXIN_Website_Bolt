import Vapi from "@vapi-ai/web"

export const ASSISTANT_ID = "5c5f6718-d63c-4fdb-9ba0-06fed7aa5af7"

const PLACEHOLDER_PUBLIC_KEY = "8d01ec4d-b93f-46bf-b24e-797c9ae28ce1"
const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY || PLACEHOLDER_PUBLIC_KEY

export const vapi = new Vapi(publicKey)

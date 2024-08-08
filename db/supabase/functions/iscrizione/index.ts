// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

console.log("Hello from Functions!")

Deno.serve(async (req) => {

  if (req.method === 'OPTIONS') return ResponseBuilder.success({});

  try {
    const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return ResponseBuilder.success(data);
  } catch (error) {
    return ResponseBuilder.serverError(error);
  }
  
  
})

export const ResponseBuilder = {
  success: (body?: object | null) => buildResponse(200, body ?? {result: 'success'}),
  badRequest: (body: object) => buildResponse(400, body),
  noAuth: (body: object) => buildResponse(401, body),
  serverError: (body: object | string) => buildResponse(500, body)
};

const buildResponse = (status: number, body: object | string) =>
  new Response(JSON.stringify(body), {
    headers: {...corsHeaders, 'Content-Type': 'application/json'},
    status
  });

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Apikey, X-Clerk-Session-Id, X-Clerk-Session-Token, X-Client-Info'
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/iscrizione' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
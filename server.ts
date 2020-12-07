import { serve, ServerRequest, Response } from 'https://deno.land/std@0.79.0/http/server.ts'
import { extname } from 'https://deno.land/std@0.79.0/path/mod.ts'

const MEDIA_TYPES: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
}

function contentType(path: string): string | undefined {
  return MEDIA_TYPES[extname(path)];
}

const hostname = Deno.env.get('HOSTNAME') ?? '0.0.0.0'
const port = Number(Deno.env.get('PORT') ?? '8000');

const server = serve({
  hostname,
  port
});

console.log(`Running flag API on ${hostname}:${port}`)

export async function serveFile(
  req: ServerRequest,
  filePath: string,
): Promise<Response> {

  const [file, fileInfo] = await Promise.all([
    Deno.open(filePath),
    Deno.stat(filePath),
  ]);

  const headers = new Headers();

  headers.set('content-length', fileInfo.size.toString());

  const contentTypeValue = contentType(filePath);

  if (contentTypeValue) {
    headers.set('content-type', contentTypeValue);
  }

  req.done.then(() => {
    file.close();
  });

  return {
    status: 200,
    body: file,
    headers,
  }
}

for await (const request of server) {
  const [, style, size, country] = request.url.split('/')
  try {
    const path = `${Deno.cwd()}/flags/${style}/${size}/${country}.png`
    const content: Partial<Response> = await serveFile(request, path)
    request.respond(content);
  } catch {
    request.respond({
      status: 404, 
      body: JSON.stringify({ status: 404, reason: 'Countryflag does not compute' }),
      headers: new Headers({'content-type': 'application/json'})
    })
  }
}
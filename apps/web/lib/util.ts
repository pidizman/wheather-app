export async function request(options: {
  path: string;
  method: "POST" | "GET" | "DELETE";
  body?: BodyInit;
}): Promise<Response> {
  const response = await fetch(`http://0.0.0.0:9090/${options.path}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      //"Access-Control-Allow-Origin": "no-cors",
    },
    ...(options.body ? { body: options.body } : {}),
  });

  return response;
}

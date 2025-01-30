async function sendPrompt() {
  const prompt = document.getElementById('prompt').value;
  const responseDiv = document.getElementById('response');

  responseDiv.innerHTML = "Loading...";

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      responseDiv.innerHTML = `Error: ${errorData.error || response.statusText}`;
      return;
    }

    const data = await response.json().catch(() => ({ response: 'No response content' }));
    responseDiv.innerHTML = data.response;

  } catch (error) {
    responseDiv.innerHTML = `Error: ${error.message}`;
  }
}
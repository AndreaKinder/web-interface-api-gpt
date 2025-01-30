async function sendPrompt() {
  const prompt = document.getElementById('prompt').value;
  const responseDiv = document.getElementById('response');

  responseDiv.innerHTML = "Loading...";

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      responseDiv.innerHTML = `Error: ${errorData.error || response.statusText}`;
      return;
    }

    const data = await response.json();
    responseDiv.innerHTML = data.response;

  } catch (error) {
    responseDiv.innerHTML = `Error: ${error.message}`;
  }
}

const API_BASE = "";

export async function checkApiHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend offline or unreachable:", err);
    return { ok: false, error: err.message };
  }
}

export async function submitFeedback(data) {
  try {
    const res = await fetch(`${API_BASE}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to submit feedback");
    }
    return json;
  } catch (err) {
    console.error("Error submitting feedback:", err);
    throw err;
  }
}

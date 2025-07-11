document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const res = await fetch("https://mindly-backend-9slr.onrender.com/api/v1/mindly/auth/signin", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" }
      });
  
      const contentType = res.headers.get("content-type");
      const body = contentType?.includes("application/json") ? await res.json() : await res.text();
  
      if (!res.ok) {
        document.getElementById("status").innerText = body;
        return;
      }
  
      await chrome.storage.local.set({ authorization: body.jwt });
      window.location.href = "add.html"; // go to content add screen
    } catch (err) {
      document.getElementById("status").innerText = "Login failed. Try again.";
    }
  });
  
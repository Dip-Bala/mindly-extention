document.addEventListener('DOMContentLoaded', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
  
    const tokenObj = await chrome.storage.local.get('authorization');
    const token = tokenObj.authorization;
  
    document.getElementById('saveBtn').addEventListener('click', async () => {
      saveBtn.classList.add('processing')
      const title = document.getElementById('title').value || "Untitled";
      const tags = document.getElementById('tags').value.split(',').map(t => t.trim());
  
      try {
        const res = await fetch("https://mindly-backend-9slr.onrender.com/api/v1/mindly/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": token
          },
          body: JSON.stringify({ title, link: url, type: "youtube", tags })
        });
  
        const body = await res.text();
  
        if (!res.ok) {
          document.getElementById("status").innerText = body;
        } else {
          document.getElementById("status").innerText = "Saved to Mindly!";
          // document.getElementById('title').innerHTML = "";
          // document.getElementById('tags').innerHTML = ""
        }
        saveBtn.classList.remove('processing');

      } catch (err) {
        document.getElementById("status").innerText = "Something went wrong.";
      }
    });
    
    document.getElementById("dashboardBtn").addEventListener("click", () => {
      chrome.tabs.create({ url: "https://www.appmindly.live/" });
    });
  });
  


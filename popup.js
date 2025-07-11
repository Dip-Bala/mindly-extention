document.addEventListener('DOMContentLoaded', async () => {
    const { authorization } = await chrome.storage.local.get('authorization');
  
    if (authorization) {
      // Token exists, show Add Content screen
      window.location.href = 'add.html';
    } else {
      // No token, show Login screen
      window.location.href = 'login.html';
    }
  });
  
  
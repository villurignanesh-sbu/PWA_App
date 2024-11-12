let deferredPrompt;
const installButton = document.getElementById('installButton');

// Listen for the 'beforeinstallprompt' event and save the prompt to show later
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
});

installButton.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome);
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// Check if the app is launched in standalone mode and redirect
if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) {
    window.location.href = 'https://app.zippidelivery.com/#/go?gwsje';
}

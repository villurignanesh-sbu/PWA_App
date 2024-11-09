let deferredPrompt;
const installButton = document.getElementById('installButton');

// Listen for the 'beforeinstallprompt' event and save the prompt to show later
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default prompt
    e.preventDefault();
    // Save the event to be triggered later
    deferredPrompt = e;
    // Show the install button
    installButton.style.display = 'block';

    // Set up the install button click listener
    installButton.addEventListener('click', () => {
        // Show the prompt to install
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome);
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
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
if (window.matchMedia('(display-mode: standalone)').matches) {
    window.location.href = 'https://www.google.com';
}

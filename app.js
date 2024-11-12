let deferredPrompt;
const installButton = document.getElementById('installButton');
const iosInstructions = document.getElementById('iosInstructions');

// Detect if the device is iOS
const isIos = () => {
    return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
};

// Detect if the device is in standalone mode (iOS)
const isInStandaloneMode = () => {
    return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
};

if (isIos() && !isInStandaloneMode()) {
    // Show instructions for iOS devices
    iosInstructions.style.display = 'block';
} else {
    // Listen for the 'beforeinstallprompt' event for Android devices
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
}

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Redirect if launched in standalone mode
if (isInStandaloneMode()) {
    window.location.href = 'https://app.zippidelivery.com/#/go?gwsje';
}

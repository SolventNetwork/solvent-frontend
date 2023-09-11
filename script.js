document.addEventListener("DOMContentLoaded", function() {
    let activeCursor = null;

    const typeText = (objId, textToType, intervalTime) => {
        return new Promise(resolve => {
            const obj = document.getElementById(objId);
            const svgDoc = obj.contentDocument;
            const typedText = svgDoc.getElementById("typedText");
            const cursor = svgDoc.getElementById("cursor");

            let currentText = "";
            let typeIndex = 0;

            activeCursor?.setAttribute('visibility', 'hidden');
            activeCursor = cursor;
            cursor.setAttribute('visibility', 'visible');
            
            const typing = setInterval(() => {
                if (typeIndex < textToType.length) {
                    currentText += textToType[typeIndex];
                    typedText.textContent = currentText;
                    cursor.setAttribute('x', 100 + typedText.getComputedTextLength());
                    typeIndex++;
                } else {
                    clearInterval(typing);
                    cursor.setAttribute('visibility', 'hidden');
                    resolve();
                }
            }, intervalTime);
        });
    };

    const setupAnimatedLink = (objId, textToType, delay, specialFunc = null) => {
        setTimeout(async () => {
            const obj = document.getElementById(objId);
            const svgDoc = obj.contentDocument;
            const typedText = svgDoc.getElementById("typedText");
            typedText.setAttribute('visibility', 'visible');

            // Execute the special function if provided
            specialFunc?.(svgDoc);

            const intervalTime = 1500 / textToType.length;
            await typeText(objId, textToType, intervalTime);
        }, delay);
    };

    const updateWhitepaperLink = function(svgDoc, latestVersion) {
        const whitepaperLink = svgDoc.querySelector('a');
        whitepaperLink.setAttribute('href', `../whitepaper/${latestVersion}.html`);
    };

    let latestVersion;
    fetch('latest-version.json')
    .then(response => response.json())
    .then(data => {
        latestVersion = data.currentVersion;
    })
    .catch(error => console.error("Could not fetch latest whitepaper version:", error));

    // Delays
    let delayDiscord = 1000;
    let delayMail = delayDiscord + 1500;
    let delayGithub = delayMail + 1500;
    let delayX = delayGithub + 1500;
    let delayWhitepaper = delayX + 1500;

    // Setup links
    setupAnimatedLink('discord-logo', "Join our Discord server", delayDiscord);
    setupAnimatedLink('mail-logo', "Send us an email", delayMail);
    setupAnimatedLink('github-logo', "Read our code", delayGithub);
    setupAnimatedLink('x-logo', "Follow us on 𝕏", delayX);

    const whitepaperObject = document.getElementById('whitepaper-logo');
    whitepaperObject.addEventListener('load', function() {
        const svgDoc = whitepaperObject.contentDocument;

        if (latestVersion) {
            updateWhitepaperLink(svgDoc, latestVersion);
        }

        setupAnimatedLink(
            'whitepaper-logo',
            'Read our whitepaper',
            delayWhitepaper
        );
    });
});

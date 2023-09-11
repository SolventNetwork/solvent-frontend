document.addEventListener("DOMContentLoaded", function() {

    const setupAnimatedLink = function(objId, textToType, delay) {
        const obj = document.getElementById(objId);
        obj.addEventListener("load", function() {
            const svgDoc = obj.contentDocument;
            const container = svgDoc.documentElement;
            const typedText = svgDoc.getElementById("typedText");
            const cursor = svgDoc.getElementById("cursor");
    
            let currentText = "";
            let typeIndex = 0;
            let typing;
            let typingFinished = false; // Track if typing is finished
    
            const startTyping = function() {
                typedText.setAttribute('visibility', 'visible');
                cursor.setAttribute('visibility', 'visible');
                
                typing = setInterval(function() {
                    if(typeIndex < textToType.length) {
                        currentText += textToType[typeIndex];
                        typedText.textContent = currentText;
                        cursor.setAttribute('x', 100 + typedText.getComputedTextLength());
                        typeIndex++;
                    } else {
                        clearInterval(typing);
                        typingFinished = true; // Set typing finished to true
                    }
                }, 100);
            };
    
            container.addEventListener('mouseover', startTyping);
            container.addEventListener('mouseout', function() {
                if (!typingFinished) { // Clear only if typing is not finished
                    typedText.setAttribute('visibility', 'hidden');
                    cursor.setAttribute('visibility', 'hidden');
                    clearInterval(typing);
                    currentText = "";
                    typedText.textContent = "";
                    typeIndex = 0;
                }
            });
    
            setTimeout(startTyping, delay);
        });
    };
    

    const updateWhitepaperLink = function(svgDoc, latestVersion) {
        const whitepaperLink = svgDoc.querySelector('a');
        whitepaperLink.setAttribute('href', `../whitepaper/${latestVersion}.html`);
    };

    // Fetch the latest whitepaper version and store it
    let latestVersion;
    fetch('latest-version.json')
    .then(response => response.json())
    .then(data => {
        latestVersion = data.currentVersion;
    })
    .catch(error => console.error("Could not fetch latest whitepaper version:", error));

    // Set up the Discord link
    setupAnimatedLink('discord-logo', "Join our Discord server", 1000);

    // Set up the whitepaper link
    const whitepaperObject = document.getElementById('whitepaper-logo');
    whitepaperObject.addEventListener('load', function() {
        const svgDoc = whitepaperObject.contentDocument;

        // Update the whitepaper link if latestVersion is available
        if (latestVersion) {
            updateWhitepaperLink(svgDoc, latestVersion);
        }

        // Continue with the animation setup
        // Here we move the logic inside the existing load event for whitepaper
        const textToType = "Read our whitepaper";
        const delay = 4000;
        const container = svgDoc.documentElement;
        const typedText = svgDoc.getElementById("typedText");
        const cursor = svgDoc.getElementById("cursor");

        let currentText = "";
        let typeIndex = 0;
        let typing;
        let typingFinished = false;

        const startTyping = function() {
            typedText.setAttribute('visibility', 'visible');
            cursor.setAttribute('visibility', 'visible');
            
            typing = setInterval(function() {
                if (typeIndex < textToType.length) {
                    currentText += textToType[typeIndex];
                    typedText.textContent = currentText;
                    cursor.setAttribute('x', 100 + typedText.getComputedTextLength());
                    typeIndex++;
                } else {
                    clearInterval(typing);
                    typingFinished = true;
                }
            }, 100);
        };

        container.addEventListener('mouseover', startTyping);
        container.addEventListener('mouseout', function() {
            if (!typingFinished) {
                typedText.setAttribute('visibility', 'hidden');
                cursor.setAttribute('visibility', 'hidden');
                clearInterval(typing);
                currentText = "";
                typedText.textContent = "";
                typeIndex = 0;
            }
        });

        setTimeout(startTyping, delay);
    });
});

document.addEventListener("DOMContentLoaded", function() {

    // Function to set up animation
    const setupAnimatedLink = function(objId, textToType) {
        const obj = document.getElementById(objId);
        obj.addEventListener("load", function() {
            const svgDoc = obj.contentDocument;
            const container = svgDoc.documentElement;
            const typedText = svgDoc.getElementById("typedText");
            const cursor = svgDoc.getElementById("cursor");

            let currentText = "";
            let typeIndex = 0;
            let typing;

            container.addEventListener('mouseover', function() {
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
                    }
                }, 100);
            });
            
            container.addEventListener('mouseout', function() {
                typedText.setAttribute('visibility', 'hidden');
                cursor.setAttribute('visibility', 'hidden');
                clearInterval(typing);
                currentText = "";
                typedText.textContent = "";
                typeIndex = 0;
            });
        });
    };

    // Set up the Discord link
    setupAnimatedLink('discord-logo', "Join our Discord server");

    // Set up the whitepaper link
    setupAnimatedLink('whitepaper-logo', "Read our whitepaper");
});

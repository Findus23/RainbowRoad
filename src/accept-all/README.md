# [Accept All](https://www.accept.lgbt/)

I stumbled across https://www.accept.lgbt/, thought it was a really fun idea and wanted to add it to the site.

But I didn't like the thought of linking an external script and wanted to slightly adapt it, so that the modal is only shown when the user clicks a button.

So I took the [banner-2024.js](https://github.com/accept-all/cdn/blob/8a09bf0d978ef6feb443a28c173bbbd86230f0fd/banner-2024.js) and manually reversed the minified code, slightly tweaked the code and adapted it to TypeScript. 

And just as I was finished, I realized that the [wf-onclick-banner.js](https://github.com/accept-all/cdn/blob/8a09bf0d978ef6feb443a28c173bbbd86230f0fd/wf-onclick-banner.js) contains the unminified source code...

All credit for the creation of this module goes to [kraftwerk Agentur für neue Kommunikation](https://www.kraftwerk.co.at/) and I hope they are fine with me using a variant of their code here.

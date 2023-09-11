# Solvent Network Frontend

This is the frontend for the Solvent Network and associated IASLO and Solvent Lending protocols. Currently it is just a landing page with links and an HTML whitepaper. In the future it will include the frontend component for both dapps.

The frontend is deployed to vercel. However, it is not currently deployed from this repo. Instead, it's deployed from an identical repo in my personal Github account. Vercel doesn't allow hobby access for anything hosted in an organization account. I will switch to a paid account (and this repo) when we launch the dapps.

To test the repo locally, run this command
```
vercel dev
```
and then open a browser tab to [http://localhost:3000/](http://localhost:3000/).

This site is intended to include all past versions of the whitepaper. When changing the whitepaper, save it as a new HTML file in the format 1.0.0.html and then update latest-version.json so that the website knows which is the latest version. This will (1) update the link on the front page, and (2) add a banner above old versions directing users to the newest one.

## Contribution Guidelines

See our [contribution guidelines](/CONTRIBUTING.md)!
'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

/* --------------------------------- Imports -------------------------------- */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { JSDOM } = require('jsdom');

/* --------------------------------- Globals -------------------------------- */
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const INPUT_FILE = path.join('public', 'how-to.html');
const OUTPUT_FILE = path.join('public', 'how-to.html');

/* ------------------------------ Main Function ----------------------------- */
readFile(INPUT_FILE, 'utf8')
  .then((content) => {
    const dom = new JSDOM(content);
    generateToc(dom.window.document);
    writeFile(OUTPUT_FILE, dom.serialize(), 'utf8')
      .then(() => {
        console.log('done');
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });

/* ------------------------------- generateToc ------------------------------ */
function generateToc(document) {
  const toc = document.getElementById('toc');
  // clear existing toc
  toc.innerHTML = '';

  const headings = document.body.querySelectorAll('main h2, main h3, main h4, main h5, main h6');
  headings.forEach((heading, index) => {
    console.log(index, heading.innerHTML);

    // create id for heading
    heading.setAttribute('id', 'toc' + index);

    // create link for heading in toc
    const tocLink = document.createElement('a');
    tocLink.setAttribute('href', '#toc' + index);
    tocLink.textContent = heading.textContent;

    // display link in toc
    const tocEntry = document.createElement('div');
    tocEntry.setAttribute('class', heading.tagName.toLowerCase());
    tocEntry.appendChild(tocLink);
    toc.appendChild(tocEntry);
  });
}

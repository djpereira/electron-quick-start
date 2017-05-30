// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron');

const desktopCapturerOptions = {
  thumbnailSize: { width: 184, height: 104 },
  types: ['window', 'screen']
};

const sourcesDiv = document.getElementById('sources');

function displaySources() {
  electron.desktopCapturer.getSources(desktopCapturerOptions, (error, sources) => {
    if (error)
      throw error;
    let content = '';
    sources.forEach(source => {
      content += `<div style='display: flex; flex-direction: column'><img src=${source.thumbnail.toDataURL()} /><div style='text-align: center'>${source.name}</div></div>`
    });
    sourcesDiv.innerHTML = content;
    setTimeout(displaySources, 250);
  });
}

setTimeout(displaySources, 250);
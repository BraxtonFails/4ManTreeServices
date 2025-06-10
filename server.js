const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Handle all routes by serving the appropriate HTML file
app.get('*', (req, res) => {
    const requestedPath = req.path;
    const htmlFile = requestedPath.endsWith('.html') ? requestedPath : `${requestedPath}.html`;
    const filePath = path.join(__dirname, htmlFile);
    
    // If the file exists, serve it; otherwise, serve index.html
    res.sendFile(filePath, (err) => {
        if (err) {
            res.sendFile(path.join(__dirname, 'index.html'));
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('.'));

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '4mantreeservices@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    // Email content
    const mailOptions = {
        from: '4mantreeservices@gmail.com',
        to: '4mantreeservices@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        
        // Send confirmation email to customer
        const customerMailOptions = {
            from: '4mantreeservices@gmail.com',
            to: email,
            subject: 'Thank you for contacting 4Man Tree Services',
            html: `
                <h2>Thank you for contacting 4Man Tree Services!</h2>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <p>Here's a copy of your message:</p>
                <p>${message}</p>
                <br>
                <p>Best regards,</p>
                <p>4Man Tree Services Team</p>
            `
        };
        await transporter.sendMail(customerMailOptions);

        res.json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again later.' 
        });
    }
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
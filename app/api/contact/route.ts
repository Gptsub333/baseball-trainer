import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactData = await request.json()
    const { firstName, lastName, email, subject, message } = body

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    })

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #dc2626; }
            .message-box { background-color: white; padding: 20px; border-left: 4px solid #dc2626; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .contact-info { background-color: #e7f3ff; padding: 15px; border-left: 4px solid #007bff; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Stay Hot Baseball</h1>
              <h2>New Contact Form Submission</h2>
            </div>
            
            <div class="content">
              <h3>Contact Information</h3>
              
              <div class="field">
                <strong>Name:</strong> ${firstName} ${lastName}
              </div>
              
              <div class="field">
                <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
              </div>
              
              <div class="field">
                <strong>Subject:</strong> ${subject}
              </div>
              
              <div class="field">
                <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
                  timeZone: 'America/Los_Angeles'
                })} PST
              </div>
              
              <div class="message-box">
                <strong>Message:</strong>
                <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div class="contact-info">
                <strong>Reply Instructions:</strong>
                <p>You can reply directly to this email or contact ${firstName} ${lastName} at: <a href="mailto:${email}">${email}</a></p>
              </div>
            </div>
            
            <div class="footer">
              <p>Stay Hot Baseball Training Facility</p>
              <p>30803 Ruth ct, Tracy CA | (209) 814-1132</p>
              <p>Training Hours: Mon-Fri 3PM-9PM | Sat 9AM-5PM | Sun by appointment</p>
              <p>This is an automated message from the Stay Hot Baseball contact system.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const mailOptions = {
      from: {
        name: 'Stay Hot Baseball Contact Form',
        address: process.env.EMAIL_USER || 'kevin@stayhotnetwork.com'
      },
      to: ['insaenztraining@gmail.com'],
      replyTo: email, 
      bcc: process.env.EMAIL_USER || 'kevin@stayhotnetwork.com', 
      subject: `Contact Form: ${subject} - From ${firstName} ${lastName}`,
      html: htmlContent,
      text: `
        New Contact Form Submission - Stay Hot Baseball
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Subject: ${subject}
        Submitted: ${new Date().toLocaleString()}
        
        Message:
        ${message}
        
        ---
        You can reply directly to this email to contact ${firstName} ${lastName}.
        
        Stay Hot Baseball Training Facility
        30803 Ruth ct, Tracy CA | (209) 814-1132
        Training Hours: Mon-Fri 3PM-9PM | Sat 9AM-5PM | Sun by appointment
      `
    }

    const info = await transporter.sendMail(mailOptions)
    
    console.log('Contact form email sent successfully!')
    console.log('Message ID:', info.messageId)
    console.log('Accepted:', info.accepted)
    console.log('Rejected:', info.rejected)

    return NextResponse.json(
      { 
        message: 'Your message has been sent successfully! We\'ll get back to you soon.',
        emailInfo: {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending contact form email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
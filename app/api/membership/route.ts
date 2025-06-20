    const getPlanDetails = (plan: string) => {
      switch(plan) {
        case 'basic':
          return '$125/month - (2) field days per month, 3 hours each'
        case 'standard':
          return '$175/month - 1 practice per week + 2 field days per month'
        case 'premium':
          return '$225/month - 2 practices per week + 2 field days per month'
        default:
          return plan
      }
    }
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface MembershipData {
  memberName: string
  memberSignature: string
  date: string
  selectedPlan: string
  agreed: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: MembershipData = await request.json()
    const { memberName, memberSignature, date, selectedPlan, agreed } = body

    if (!memberName || !memberSignature || !date || !selectedPlan || !agreed) {
      return NextResponse.json(
        { error: 'All fields are required' },
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
          <title>New Membership Agreement Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #dc2626; }
            .agreement-text { background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Stay Hot Baseball</h1>
              <h2>New Membership Agreement Submission</h2>
            </div>
            
            <div class="content">
              <h3>Member Information</h3>
              
              <div class="field">
                <strong>Member Name:</strong> ${memberName}
              </div>
              
              <div class="field">
                <strong>Digital Signature:</strong> ${memberSignature}
              </div>
              
              <div class="field">
                <strong>Selected Plan:</strong> ${getPlanDetails(selectedPlan)}
              </div>
              
              <div class="field">
                <strong>Date Signed:</strong> ${new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              <div class="field">
                <strong>Submission Date:</strong> ${new Date().toLocaleString('en-US', {
                  timeZone: 'America/Los_Angeles'
                })} PST
              </div>
              
              <div class="agreement-text">
                <strong>Agreement Status:</strong> ✅ Member has agreed to all terms and conditions of the Stay Hot Baseball Membership Agreement
              </div>
              
              <h3>Membership Options Available</h3>
              <ul>
                <li><strong>$125/month:</strong> (2) field days a month, 3 hours each</li>
                <li><strong>$175/month:</strong> 1 practice per week + 2 field days a month</li>
                <li><strong>$225/month:</strong> 2 practices per week + 2 field days a month</li>
              </ul>
              
              <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #007bff;">
                <strong>Selected Plan:</strong>
                <p style="font-size: 16px; margin: 5px 0; color: #dc2626;">${getPlanDetails(selectedPlan)}</p>
                <strong>Next Steps:</strong>
                <p>Please contact ${memberName} to finalize the ${selectedPlan} membership and set up payment.</p>
              </div>
            </div>
            
            <div class="footer">
              <p>Stay Hot Baseball | (209) 814-1132 | insaenztraining@gmail.com</p>
              <p>This is an automated message from the Stay Hot Baseball membership system.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Email options
    const mailOptions = {
      from: {
        name: 'Stay Hot Baseball',
        address: process.env.EMAIL_USER || 'kevin@stayhotnetwork.com'
      },
      to: ['insaenztraining@gmail.com'],
      bcc: process.env.EMAIL_USER || 'kevin@stayhotnetwork.com', 
      subject: `New Membership Agreement - ${memberName}`,
      html: htmlContent,
      text: `
        New Membership Agreement Submission
        
        Member Name: ${memberName}
        Digital Signature: ${memberSignature}
        Date Signed: ${new Date(date).toLocaleDateString()}
        Selected Plan: ${getPlanDetails(selectedPlan)}
        Submission Date: ${new Date().toLocaleString()}
        
        The member has agreed to all terms and conditions of the Stay Hot Baseball Membership Agreement.
        
        Please contact ${memberName} to finalize the ${selectedPlan} membership and set up payment.
        
        Stay Hot Baseball | (209) 814-1132 | insaenztraining@gmail.com
      `
    }

    const info = await transporter.sendMail(mailOptions)
    
    console.log('Email sent successfully!')
    console.log('Message ID:', info.messageId)
    console.log('Accepted:', info.accepted)
    console.log('Rejected:', info.rejected)

    return NextResponse.json(
      { 
        message: 'Membership agreement submitted successfully',
        emailInfo: {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to submit membership agreement' },
      { status: 500 }
    )
  }
}
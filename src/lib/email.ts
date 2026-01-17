import { env } from '@/env'

export interface EmailOptions {
  to: string | Array<string>
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, text } = options

  if (!env.RESEND_API_KEY && !env.SMTP_HOST) {
    console.warn(
      'Email service not configured. Set RESEND_API_KEY or SMTP_* variables.',
    )
    return false
  }

  try {
    if (env.RESEND_API_KEY) {
      return await sendWithResend({
        to,
        subject,
        html,
        text,
      })
    }

    if (env.SMTP_HOST) {
      return await sendWithSMTP({
        to,
        subject,
        html,
        text,
      })
    }

    return false
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

async function sendWithResend(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, text } = options

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      to,
      subject,
      html,
      text,
      from: env.EMAIL_FROM || 'KU MedAI Challenge <noreply@resend.dev>',
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Resend API error:', error)
    return false
  }

  return true
}

async function sendWithSMTP(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, text } = options

  const host = env.SMTP_HOST
  const port = env.SMTP_PORT || 587
  const user = env.SMTP_USER
  const pass = env.SMTP_PASS

  if (!host || !user || !pass) {
    console.warn('SMTP credentials not configured')
    return false
  }

  const nodemailer = await import('nodemailer')
  const transporter = nodemailer.default.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: env.EMAIL_FROM || user,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text,
    })
    return true
  } catch (error) {
    console.error('SMTP send error:', error)
    return false
  }
}

export function generateTeamRegistrationEmail(
  teamName: string,
  leaderName: string,
  memberCount: number,
): { html: string; text: string } {
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Team Registration Confirmation</title>
    <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .content-padding { padding: 30px 20px !important; }
            .mobile-font { font-size: 16px !important; }
        }
        @media (prefers-color-scheme: light) {
            .dark-mode-only { display: none !important; }
            .light-mode-override { background-color: #ffffff !important; }
            .light-card-override { background-color: #f8fafc !important; }
            .light-text-override { color: #1f2937 !important; }
            .light-text-muted-override { color: #6b7280 !important; }
            .light-border-override { border-color: #e5e7eb !important; }
            .light-bg-override { background-color: #f4f4f4 !important; }
        }
        @media (prefers-color-scheme: dark) {
            .light-mode-only { display: none !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: Helvetica, Arial, sans-serif;">
    <center style="width: 100%; background-color: #0f172a;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f172a; margin: 0; padding: 40px 0;">
            <tr>
                <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container light-card-override" style="background-color: #1e293b; width: 600px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(80, 216, 175, 0.2); border-collapse: collapse;">
                        <tr>
                            <td bgcolor="#0c2e8a" align="center" style="padding: 35px 30px; background: linear-gradient(135deg, #0c2e8a 0%, #1e40af 100%);">
                                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-family: Helvetica, Arial, sans-serif; line-height: 1.4;">KU MedAI Innovation Challenge 2026</h1>
                                <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 13px; font-family: Helvetica, Arial, sans-serif;">Innovate for Health. Empower with AI.</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="content-padding" style="padding: 40px; text-align: left;">
                                <h2 style="margin-top: 0; color: #50d8af; font-family: Helvetica, Arial, sans-serif; font-size: 22px;">You're registered! 🎉</h2>
                                <p class="light-text-override" style="font-size: 16px; color: #e2e8f0; line-height: 1.6; font-family: Helvetica, Arial, sans-serif;">
                                    Hi <strong style="color: #50d8af;">${leaderName}</strong>,
                                </p>
                                <p class="light-text-override" style="font-size: 16px; color: #cbd5e1; line-height: 1.6; font-family: Helvetica, Arial, sans-serif;">
                                    Congratulations! Your team, <strong style="color: #50d8af;">${teamName}</strong>, has been successfully registered for the KU MedAI Innovation Challenge 2026. We're excited to see your innovative solutions!
                                </p>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="light-mode-override" style="background-color: rgba(80, 216, 175, 0.1); border: 1px solid rgba(80, 216, 175, 0.3); border-radius: 4px; margin: 30px 0;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td valign="top" style="padding-bottom: 10px; font-weight: bold; color: #50d8af; width: 35%; font-family: Helvetica, Arial, sans-serif;">Team Name:</td>
                                                    <td valign="top" class="light-text-override" style="padding-bottom: 10px; color: #ffffff; font-family: Helvetica, Arial, sans-serif;">${teamName}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" style="padding-bottom: 10px; font-weight: bold; color: #50d8af; font-family: Helvetica, Arial, sans-serif;">Team Leader:</td>
                                                    <td valign="top" class="light-text-override" style="padding-bottom: 10px; color: #ffffff; font-family: Helvetica, Arial, sans-serif;">${leaderName}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" style="font-weight: bold; color: #50d8af; font-family: Helvetica, Arial, sans-serif;">Members:</td>
                                                    <td valign="top" class="light-text-override" style="color: #ffffff; font-family: Helvetica, Arial, sans-serif;">${memberCount} members</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <p class="light-text-muted-override" style="font-size: 15px; color: #94a3b8; line-height: 1.6; font-family: Helvetica, Arial, sans-serif;">
                                    Stay tuned for updates about the workshop, mentoring sessions, and submission guidelines. The competition dates are:
                                </p>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0;">
                                    <tr>
                                        <td class="light-text-muted-override" style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #94a3b8; padding: 8px 0;">
                                            <span style="color: #50d8af; margin-right: 8px;">•</span> Registration: January 26 - February 7, 2026
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="light-text-muted-override" style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #94a3b8; padding: 8px 0;">
                                            <span style="color: #50d8af; margin-right: 8px;">•</span> Workshop & Mentoring: February 7, 2026
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="light-text-muted-override" style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #94a3b8; padding: 8px 0;">
                                            <span style="color: #50d8af; margin-right: 8px;">•</span> Final Pitch: March 7, 2026
                                        </td>
                                    </tr>
                                </table>
                                <p class="light-text-muted-override" style="font-size: 14px; color: #64748b; border-top: 1px solid rgba(80, 216, 175, 0.2); padding-top: 20px; font-family: Helvetica, Arial, sans-serif; margin-top: 25px;">
                                    <span style="color: #50d8af;">Organized by:</span> Kasetsart University · KURDI · Faculty of Science, Department of Computer Science<br>
                                    <span style="color: #50d8af;">Contact:</span> aiih.sci@ku.th · 02-562-5555 ext. 647209, 647210
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#0c2e8a" class="light-bg-override" style="padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; font-family: Helvetica, Arial, sans-serif; background: rgba(12, 46, 138, 0.5);">
                                <p style="margin: 0; color: rgba(255,255,255,0.6);">&copy; 2026 KU MedAI Innovation Challenge. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`

  const text = `
Team Registration Confirmation

Hi ${leaderName},

Congratulations! Your team "${teamName}" has been successfully registered for the KU MedAI Innovation Challenge 2026.

Team Details:
- Team Name: ${teamName}
- Team Leader: ${leaderName}
- Total Members: ${memberCount} members

Competition Dates:
- Registration: January 26 - February 7, 2026
- Workshop & Mentoring: February 7, 2026
- Final Pitch: March 7, 2026

Organized by:
- Kasetsart University
- KURDI
- Faculty of Science, Department of Computer Science

Contact: aiih.sci@ku.th · 02-562-5555 ext. 647209, 647210

© 2026 KU MedAI Innovation Challenge. All rights reserved.
  `

  return { html, text }
}

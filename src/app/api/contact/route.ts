import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      eventType,
      eventDate,
      guests,
      message,
    } = body;

    // Basic validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, phone and email are required.',
        },
        { status: 400 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Website Enquiry <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'your-email@example.com'],
      replyTo: email,

      subject: `New Event Enquiry from ${name}`,

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>

          <body style="margin:0; padding:0; background:#f5f2ea; font-family:Arial, sans-serif;">

            <div style="max-width:650px; margin:40px auto; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e5dfd0;">

              <!-- Header -->
              <div style="background:#d4af37; padding:25px 30px;">
                <h1 style="margin:0; color:#1a1a1a; font-size:24px;">
                  New Event Enquiry
                </h1>

                <p style="margin:8px 0 0; color:#333333; font-size:14px;">
                  You have received a new enquiry from your website.
                </p>
              </div>

              <!-- Content -->
              <div style="padding:30px;">

                <h2 style="font-size:18px; color:#222; margin-top:0;">
                  Customer Details
                </h2>

                <table style="width:100%; border-collapse:collapse;">

                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #eee; font-weight:bold; width:35%;">
                      Name
                    </td>
                    <td style="padding:12px 0; border-bottom:1px solid #eee;">
                      ${name}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #eee; font-weight:bold;">
                      Phone
                    </td>
                    <td style="padding:12px 0; border-bottom:1px solid #eee;">
                      ${phone}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #eee; font-weight:bold;">
                      Email
                    </td>
                    <td style="padding:12px 0; border-bottom:1px solid #eee;">
                      ${email}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #eee; font-weight:bold;">
                      Event Type
                    </td>
                    <td style="padding:12px 0; border-bottom:1px solid #eee;">
                      ${eventType || 'Not specified'}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #eee; font-weight:bold;">
                      Event Date
                    </td>
                    <td style="padding:12px 0; border-bottom:1px solid #eee;">
                      ${eventDate || 'Not specified'}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:12px 0; border-bottom:1px solid #eee; font-weight:bold;">
                      Guests
                    </td>
                    <td style="padding:12px 0; border-bottom:1px solid #eee;">
                      ${guests || 'Not specified'}
                    </td>
                  </tr>

                </table>

                <!-- Message -->
                <h2 style="font-size:18px; color:#222; margin-top:30px;">
                  Message
                </h2>

                <div style="background:#f8f6f0; padding:20px; border-radius:6px; color:#444; line-height:1.6;">
                  ${message || 'No message provided.'}
                </div>

                <!-- Reply -->
                <div style="margin-top:30px;">
                  <a
                    href="mailto:${email}"
                    style="
                      display:inline-block;
                      background:#d4af37;
                      color:#1a1a1a;
                      padding:12px 22px;
                      text-decoration:none;
                      border-radius:4px;
                      font-weight:bold;
                    "
                  >
                    Reply to Customer
                  </a>
                </div>

              </div>

              <!-- Footer -->
              <div style="background:#1a1a1a; padding:20px 30px; text-align:center;">
                <p style="margin:0; color:#ffffff; font-size:13px;">
                  Sree Souram Event Management
                </p>

                <p style="margin:6px 0 0; color:#aaa; font-size:12px;">
                  This enquiry was submitted through your website.
                </p>
              </div>

            </div>

          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send enquiry.',
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry sent successfully.',
      data,
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while sending the enquiry.',
      },
      { status: 500 }
    );
  }
}
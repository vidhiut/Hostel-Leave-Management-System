import Mustache from "mustache";

// Replace placeholders with dynamic data
const generateEmail = async(data) => {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Leave Application</title>
    </head>
    <body>
      <p>Dear {{name}} ,</p>

      <p>I hope this email finds you well. Your Child {{childname}} has requested for a leave and requires your permission for the same</p>

      <p>Plz check the below request.</p>

      <a href="{{applicationURL}}"
        style="text-decoration: none; border: 1px solid #d3d3d3; border-radius: 10px; padding: 0.5rem; font-size: 1.5rem; width: max-content; margin: 1rem 0">
        View Details
      </a>

      

      <p>Thank you for using DigiGuard. If you have any questions or need further assistance, please do not
        hesitate to contact our support team.</p>

      Best regards,<br />
      DigiGuard
    </body>
    </html>
  `;

  // Use Mustache to render the template with dynamic data
  return Mustache.render(template, data);
};

export default generateEmail;

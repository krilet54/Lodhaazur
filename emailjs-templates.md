# EmailJS Templates for Lodha Azur Leads

Use these exact variable names in EmailJS templates:

- `{{user_name}}`
- `{{user_phone}}`
- `{{user_email}}`
- `{{lead_source}}`
- `{{project_name}}`
- `{{page_url}}`
- `{{submitted_at}}`
- `{{to_email}}`
- `{{year}}`

## 1) Internal Team Alert Template

Template purpose: notify your sales/admin team for each enquiry.

Set in EmailJS template settings:

- `To Email`: your intended team inbox (example: `sales@yourdomain.com`)
- `Reply To`: `{{user_email}}`
- Subject:

```text
New Enquiry Received | {{project_name}} | {{lead_source}}
```

HTML body:

```html
<div style="margin:0;padding:24px;background:#f5f7fb;font-family:Arial,sans-serif;color:#1a1f36;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7ebf3;">
    <tr>
      <td style="background:#0f2a4a;padding:20px 24px;color:#ffffff;">
        <h2 style="margin:0;font-size:22px;line-height:1.3;">New Website Enquiry</h2>
        <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">{{project_name}}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <p style="margin:0 0 16px;font-size:15px;">A new enquiry has been received from your website.</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:bold;width:150px;">Name</td><td style="padding:8px 0;">{{user_name}}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td style="padding:8px 0;">{{user_phone}}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td style="padding:8px 0;">{{user_email}}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Lead Source</td><td style="padding:8px 0;">{{lead_source}}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Submitted At</td><td style="padding:8px 0;">{{submitted_at}}</td></tr>
        </table>
        <p style="margin:20px 0 0;font-size:14px;color:#5c6479;">Page URL: <a href="{{page_url}}" style="color:#0f62fe;text-decoration:none;">{{page_url}}</a></p>
      </td>
    </tr>
  </table>
</div>
```

## 2) User Acknowledgement Template

Template purpose: auto-reply to customer confirming enquiry receipt.

Set in EmailJS template settings:

- `To Email`: `{{to_email}}`
- Subject:

```text
We Received Your Enquiry | {{project_name}}
```

HTML body:

```html
<div style="margin:0;padding:24px;background:#f4f8f4;font-family:Arial,sans-serif;color:#203424;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dfe9e0;">
    <tr>
      <td style="background:#1f5a2e;padding:22px 24px;color:#ffffff;">
        <h2 style="margin:0;font-size:22px;line-height:1.3;">Thank You, {{user_name}}</h2>
        <p style="margin:8px 0 0;font-size:14px;opacity:0.95;">Your enquiry has been received successfully.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">
          Thank you for your interest in <strong>{{project_name}}</strong>. Our team will contact you shortly with the requested details.
        </p>
        <div style="background:#f8fbf8;border:1px solid #e5efe6;border-radius:8px;padding:14px 16px;margin:14px 0;">
          <p style="margin:0 0 8px;font-size:14px;"><strong>Reference Details</strong></p>
          <p style="margin:0;font-size:14px;">Lead Type: {{lead_source}}</p>
          <p style="margin:6px 0 0;font-size:14px;">Submitted On: {{submitted_at}}</p>
        </div>
        <p style="margin:16px 0 0;font-size:14px;line-height:1.7;">
          If you need immediate assistance, simply reply to this email and our team will help you.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;background:#f2f7f3;font-size:12px;color:#5b6f60;">
        © {{year}} {{project_name}}. All rights reserved.
      </td>
    </tr>
  </table>
</div>
```

## Final Wiring Checklist

1. Put your real values in `window.EMAILJS_CONFIG` inside `index.html`:
   - `publicKey`
   - `serviceId`
   - `adminTemplateId`
   - `userTemplateId`
2. Save both templates in EmailJS exactly with the variables listed above.
3. Test one form submission from the website and verify:
   - Team inbox receives internal alert.
   - User email receives acknowledgement.

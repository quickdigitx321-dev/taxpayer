const { sendMail } = require("./email");

const siteName = "Tax Payer Alliance Pakistan";
const adminEmail = () => process.env.ADMIN_NOTIFICATION_EMAIL;

function shell(title, body) {
  return `
    <div style="font-family: Arial, sans-serif; color: #1b1b1b; line-height: 1.6;">
      <div style="max-width: 620px; margin: 0 auto; border: 1px solid #e5e1d8;">
        <div style="background: #05291f; color: #f5d982; padding: 20px 24px; font-weight: 700; letter-spacing: 1px;">
          ${siteName}
        </div>
        <div style="padding: 24px;">
          <h2 style="margin: 0 0 14px; font-size: 24px;">${title}</h2>
          ${body}
          <p style="margin-top: 24px; color: #6b6258; font-size: 13px;">
            This is an automated notification from ${siteName}.
          </p>
        </div>
      </div>
    </div>
  `;
}

function rows(items) {
  return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
      ${items
        .map(
          ([label, value]) => `
            <tr>
              <td style="border-top: 1px solid #eee; padding: 9px 0; color: #6b6258; width: 34%;">${label}</td>
              <td style="border-top: 1px solid #eee; padding: 9px 0; font-weight: 600;">${value || "-"}</td>
            </tr>
          `
        )
        .join("")}
    </table>
  `;
}

async function sendMembershipNotifications(data, id) {
  const reference = `TPAP-APP-${String(id).padStart(5, "0")}`;

  const customer = await sendMail({
    to: data.email,
    subject: `TPAP membership application received - ${reference}`,
    text: `Thank you for applying for TPAP membership. Your application has been received and is under review. Reference: ${reference}.`,
    html: shell(
      "Your membership application has been received",
      `
        <p>Dear ${data.firstName},</p>
        <p>Thank you for applying for membership with Tax Payer Alliance Pakistan. Your application has been received successfully and is now under review by the TPAP team.</p>
        <p><strong>Reference number:</strong> ${reference}</p>
        <p>We will notify you by email when your application status changes.</p>
      `
    )
  });

  const admin = await sendMail({
    to: adminEmail(),
    subject: `New TPAP membership application - ${reference}`,
    text: `New membership application received from ${data.firstName} ${data.lastName}. Reference: ${reference}. Email: ${data.email}. Phone: ${data.phone}.`,
    html: shell(
      "New membership application received",
      `
        <p>A new membership application has been submitted for admin review.</p>
        ${rows([
          ["Reference", reference],
          ["Applicant", `${data.firstName} ${data.lastName}`],
          ["Email", data.email],
          ["Phone", data.phone],
          ["CNIC", data.cnic],
          ["NTN", data.ntn],
          ["Organization", data.organizationName],
          ["Office Address", data.officeAddress]
        ])}
      `
    )
  });

  return { customer, admin };
}

async function sendMembershipStatusNotification(application, status, membershipId, adminNotes) {
  const applicantName = `${application.first_name} ${application.last_name}`.trim();
  const applicationReference = `TPAP-APP-${String(application.id).padStart(5, "0")}`;
  const isApproved = status === "approved";
  const isRejected = status === "rejected";
  const title = isApproved
    ? "Your TPAP membership application has been approved"
    : isRejected
      ? "Update on your TPAP membership application"
      : "Your TPAP membership application is under review";
  const summary = isApproved
    ? `Congratulations. Your TPAP membership application has been approved. Your membership ID is ${membershipId}.`
    : isRejected
      ? "Your TPAP membership application was not approved at this time."
      : "Your TPAP membership application status has been updated to pending review.";
  const nextStep = isApproved
    ? "Welcome to Tax Payer Alliance Pakistan. We will contact you with membership updates, opportunities, and advocacy activities."
    : isRejected
      ? "You may contact the TPAP team if you require clarification or wish to submit updated information."
      : "The TPAP team will notify you when the review is complete.";

  return sendMail({
    to: application.email,
    subject: `${title} - ${applicationReference}`,
    text: `${summary} ${nextStep}${adminNotes ? ` Admin note: ${adminNotes}` : ""}`,
    html: shell(
      title,
      `
        <p>Dear ${applicantName || "Applicant"},</p>
        <p>${summary}</p>
        ${rows([
          ["Application reference", applicationReference],
          ["Status", status.replace("_", " ").toUpperCase()],
          ["Membership ID", membershipId || "-"],
          ["Admin note", adminNotes || "-"]
        ])}
        <p>${nextStep}</p>
      `
    )
  });
}

async function sendComplaintNotifications(data, id) {
  const reference = `TPAP-CMP-${String(id).padStart(5, "0")}`;

  await Promise.all([
    sendMail({
      to: adminEmail(),
      subject: `New TPAP complaint/suggestion - ${reference}`,
      text: `New complaint/suggestion received from ${data.fullName}. Reference: ${reference}. Subject: ${data.subject}.`,
      html: shell(
        "New complaint or suggestion received",
        `
          <p>A new public complaint or suggestion has been submitted.</p>
          ${rows([
            ["Reference", reference],
            ["Name", data.fullName],
            ["Email", data.email],
            ["Phone", data.phone],
            ["Subject", data.subject],
            ["Message", data.message]
          ])}
        `
      )
    }),
    sendMail({
      to: data.email,
      subject: `TPAP submission received - ${reference}`,
      text: `Your complaint/suggestion has been received. Reference: ${reference}. TPAP will review it and respond where appropriate.`,
      html: shell(
        "Your submission has been received",
        `
          <p>Dear ${data.fullName},</p>
          <p>Thank you for contacting Tax Payer Alliance Pakistan. Your complaint/suggestion has been received and will be reviewed by the relevant team.</p>
          <p><strong>Reference number:</strong> ${reference}</p>
        `
      )
    })
  ]);
}

async function sendContactNotifications(data, id) {
  const reference = `TPAP-INQ-${String(id).padStart(5, "0")}`;

  await Promise.all([
    sendMail({
      to: adminEmail(),
      subject: `New TPAP contact inquiry - ${reference}`,
      text: `New contact inquiry received from ${data.name}. Reference: ${reference}. Email: ${data.email}.`,
      html: shell(
        "New contact inquiry received",
        `
          <p>A new contact inquiry has been submitted through the website.</p>
          ${rows([
            ["Reference", reference],
            ["Name", data.name],
            ["Email", data.email],
            ["Phone", data.phone],
            ["Message", data.message]
          ])}
        `
      )
    }),
    sendMail({
      to: data.email,
      subject: `TPAP inquiry received - ${reference}`,
      text: `Your inquiry has been received. Reference: ${reference}. TPAP will review your message and respond where appropriate.`,
      html: shell(
        "Your inquiry has been received",
        `
          <p>Dear ${data.name},</p>
          <p>Thank you for contacting Tax Payer Alliance Pakistan. Your inquiry has been received successfully.</p>
          <p><strong>Reference number:</strong> ${reference}</p>
          <p>Our team will review your message and respond where appropriate.</p>
        `
      )
    })
  ]);
}

module.exports = {
  sendMembershipNotifications,
  sendMembershipStatusNotification,
  sendComplaintNotifications,
  sendContactNotifications
};

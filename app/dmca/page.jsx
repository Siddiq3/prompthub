export const metadata = {
  title: "DMCA - PhotoPromptsHub",
  description: "DMCA notice and copyright information for PhotoPromptsHub.",
};

export default function DmcaPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl">
      <h1>DMCA Notice</h1>
      <p className="text-sm text-slate-500">Last updated: January 2024</p>

      <h2>Copyright</h2>
      <p>
        PhotoPromptsHub respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA).
      </p>

      <h2>Reporting Copyright Infringement</h2>
      <p>
        If you believe that your copyrighted work has been infringed upon, please contact us with the following information:
      </p>
      <ul>
        <li>A description of the copyrighted work</li>
        <li>The URL or location where the content is located</li>
        <li>Your name, address, telephone number, and email address</li>
        <li>A statement that you have a good faith belief</li>
        <li>Your physical or electronic signature</li>
      </ul>

      <h2>Contact Information</h2>
      <p>
        Send DMCA notices to: <a href="mailto:hello@photopromptshub.in">hello@photopromptshub.in</a>
      </p>
    </div>
  );
}

interface PrivacyContentProps {
  readonly siteName: string;
  readonly contactEmail: string;
}

export const LAST_UPDATED = "January 1, 2026";

export function PrivacyContent({ siteName, contactEmail }: PrivacyContentProps) {
  return (
    <>
      <p>
        <strong>Template text — replace it with your own reviewed privacy policy. This is not legal advice.</strong>
      </p>
      <p>This policy describes how {siteName} handles information when you use the site.</p>
      <hr />
      <h2>Information we collect</h2>
      <p>We collect the details you give us, such as your name, email address and anything you submit through forms, and basic usage data like pages visited.</p>
      <hr />
      <h2>How we use it</h2>
      <p>We use this information to run and improve {siteName}, respond to your requests and keep the service secure.</p>
      <hr />
      <h2>Sharing</h2>
      <p>We do not sell your personal information. We share it only with service providers that help us operate {siteName}, or when the law requires it.</p>
      <hr />
      <h2>Your choices</h2>
      <p>You can ask to access, correct or delete your information at any time by contacting us.</p>
      <hr />
      <h2>Contact for privacy</h2>
      <p>Questions about this policy can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
    </>
  );
}

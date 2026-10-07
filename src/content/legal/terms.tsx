interface TermsContentProps {
  readonly siteName: string;
  readonly contactEmail: string;
}

export const LAST_UPDATED = "January 1, 2026";

export function TermsContent({ siteName, contactEmail }: TermsContentProps) {
  return (
    <>
      <p>
        <strong>Template text — replace it with your own reviewed terms of service. This is not legal advice.</strong>
      </p>
      <p>These terms govern your use of {siteName}. By using the site you agree to them.</p>
      <hr />
      <h2>Use of the service</h2>
      <p>You may use {siteName} only in line with the law and these terms. Do not misuse, disrupt or attempt to gain unauthorized access to the service.</p>
      <hr />
      <h2>Accounts</h2>
      <p>You are responsible for keeping your credentials safe and for activity under your account.</p>
      <hr />
      <h2>Content</h2>
      <p>You keep ownership of content you submit and grant {siteName} permission to display it as part of the service.</p>
      <hr />
      <h2>Disclaimers</h2>
      <p>The service is provided as is, without warranties of any kind, and we are not liable for losses arising from its use to the extent the law allows.</p>
      <hr />
      <h2>Contact for terms</h2>
      <p>Questions about these terms can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
    </>
  );
}

import { Link, useNavigate } from 'react-router-dom'

export default function PrivacyPolicy() {
  const navigate = useNavigate()
  const lastUpdated = '2 Nov 2026'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
         <button
    type="button"
    onClick={() => navigate('/login')}
    className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Back
  </button>

        {/* Header */}
        <header className="border-b-2 border-gray-200 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">
            Last updated: <strong>{lastUpdated}</strong> &nbsp;|&nbsp; Effective:{' '}
            <strong>{lastUpdated}</strong>
          </p>
        </header>

        {/* Intro */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            This Privacy Policy explains how <strong>SUBook Event & Facility Booking System</strong>{' '}
            ("we", "us", "our") collects, uses, stores, and protects your personal
            data when you use the <strong>SUB Event & Facility Booking System</strong> (the
            "Service"), including any payment features processed via HitPay.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We handle your personal data in accordance with the Malaysia Personal
            Data Protection Act 2010 (PDPA) and, where applicable, the EU General
            Data Protection Regulation (GDPR). By using the Service, you
            acknowledge that you have read and understood this Policy.
          </p>
        </section>

        {/* Who We Are */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Who We Are</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li><strong>Organisation:</strong> Majlis Perwakilan Pelajar UTM</li>
            <li><strong>Project:</strong> SUB Event & Facility Booking System</li>
            <li><strong>Privacy contact:</strong> mpp@utm.my</li>
            <li><strong>Address:</strong> Pusat Pentadbiran Universiti Teknologi Malaysia, Majlis Perwakilan Pelajar UTM, Bangunan Persatuan Pelajar (SUB), Universiti Teknologi Malaysia, 81310 Johor Bahru,  Johor</li>
          </ul>
        </section>

        {/* Data Collected */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            3. Personal Data We Collect
          </h2>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">
            3.1 Data you provide directly
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li><strong>Account data:</strong> name, email address, profile picture (via Google SSO)</li>
            <li><strong>Booking data:</strong> venue, date, time slot, purpose, number of attendees</li>
            <li><strong>Feedback data:</strong> responses submitted through our feedback form</li>
            <li><strong>Lost item reports:</strong> item description, date lost, contact details</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">
            3.2 Data collected automatically
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li><strong>Authentication data:</strong> Google account identifier, session tokens</li>
            <li><strong>Audit log data:</strong> actions performed, timestamp, user ID, affected record</li>
            <li><strong>Technical data:</strong> IP address, browser type, device type, pages visited</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">
            3.3 Data we do NOT collect
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We do not collect government ID numbers or sensitive personal data
            (health, religion, biometric data) unless you voluntarily include it in a
            free-text field. We never store full card numbers, CVV, or banking
            credentials — those are handled by HitPay.
          </p>
        </section>

        {/* How We Use */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            4. How We Use Your Personal Data
          </h2>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-3 py-2 text-left">Purpose</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Legal basis</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr><td className="border border-gray-200 px-3 py-2">Creating and managing your account</td><td className="border border-gray-200 px-3 py-2">Performance of a contract</td></tr>
                <tr><td className="border border-gray-200 px-3 py-2">Processing and confirming venue bookings</td><td className="border border-gray-200 px-3 py-2">Performance of a contract</td></tr>
                <tr><td className="border border-gray-200 px-3 py-2">Processing payments via HitPay</td><td className="border border-gray-200 px-3 py-2">Performance of a contract</td></tr>
                <tr><td className="border border-gray-200 px-3 py-2">Displaying role-appropriate dashboards</td><td className="border border-gray-200 px-3 py-2">Legitimate interest</td></tr>
                <tr><td className="border border-gray-200 px-3 py-2">Sending booking confirmations and notifications</td><td className="border border-gray-200 px-3 py-2">Performance of a contract</td></tr>
                <tr><td className="border border-gray-200 px-3 py-2">Maintaining audit logs for security and accountability</td><td className="border border-gray-200 px-3 py-2">Legitimate interest / legal obligation</td></tr>
                <tr><td className="border border-gray-200 px-3 py-2">Responding to feedback and lost item reports</td><td className="border border-gray-200 px-3 py-2">Consent</td></tr>
                <tr><td className="border border-gray-200 px-3 py-2">Improving the Service</td><td className="border border-gray-200 px-3 py-2">Legitimate interest</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700">We do <strong>not</strong> sell, rent, or trade your personal data.</p>
        </section>

        {/* Google SSO */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Google Sign-In (SSO)</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            The Service uses Google Sign-In for authentication. When you sign in with
            Google, Google shares your name, email address, and profile picture with
            us. Google's handling of your data is governed by the{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google Privacy Policy
            </a>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We only store the minimum information needed to identify your account and
            assign your role (student, staff, or admin).
          </p>
        </section>

        {/* Security */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Storage and Security</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Your data is stored in <strong>Supabase</strong> (PostgreSQL) and the
            application is hosted on <strong>Vercel</strong>. We implement the
            following safeguards:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
            <li>Row-Level Security (RLS) policies restricting access to your own data</li>
            <li>Backend permission checks (role-based access control)</li>
            <li>Audit logging of sensitive actions (booking approval, venue changes, payments)</li>
            <li>HTTPS encryption in transit</li>
            <li>Restricted access to the service-role key (server-side only)</li>
            <li>PCI-DSS compliant payment handling via HitPay (no card data stored on our servers)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            No system is completely secure. If we become aware of a data breach
            affecting your data, we will notify you and the relevant authorities
            without undue delay.
          </p>
        </section>

        {/* Payments / HitPay */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            7. Payments and HitPay
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3 italic">
            This section applies only to features that require payment. As of the
            "Last updated" date, the Service does not process payments; this section
            will take effect when payment features are launched.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">7.1 Payment processing</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            When you make a payment through the Service, payment is processed by{' '}
            <strong>HitPay Payment Solutions Pte. Ltd.</strong> ("HitPay"), a
            third-party payment gateway based in Singapore. HitPay collects and
            processes your payment details (such as card number, expiry date, CVV, or
            FPX/e-wallet credentials) directly.{' '}
            <strong>
              We do not receive or store your full card number, CVV, or banking
              credentials.
            </strong>
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">
            7.2 Data we receive from HitPay
          </h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            After a transaction, HitPay sends us the following data, which we store:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
            <li>HitPay transaction reference ID</li>
            <li>Payment status (pending, paid, failed, refunded, cancelled)</li>
            <li>Amount and currency</li>
            <li>Payment method type (card, FPX, e-wallet) — not full details</li>
            <li>Timestamp of payment</li>
            <li>Your name and email address (for receipts and reconciliation)</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">7.3 Legal basis</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            Processing payment data is necessary for the{' '}
            <strong>performance of a contract</strong> (fulfilling your booking) and
            for our <strong>legitimate interest</strong> in fraud prevention,
            accounting, and audit compliance.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">7.4 Cross-border transfer</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            HitPay is based in Singapore. Your payment data may be transferred to,
            stored in, and processed in Singapore and other jurisdictions where
            HitPay or its sub-processors operate. We rely on HitPay's standard
            contractual clauses and data processing agreement to safeguard such
            transfers.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">7.5 Retention</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            Payment records (transaction IDs, amounts, statuses) are retained for{' '}
            <strong>7 years</strong> to comply with accounting and tax obligations.
            Card details are never stored by us and are retained only by HitPay per
            their own retention policy.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">7.6 Refunds</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            Refunds are processed through HitPay. To request a refund, contact{' '}
            <strong>mpp@utm.my</strong>. Refund eligibility is governed
            by our Terms of Use and SUBook's refund policy.
          </p>

          <p className="text-gray-700 leading-relaxed">
            For details on how HitPay handles your data, see the{' '}
            <a
              href="https://hitpayapp.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              HitPay Privacy Policy
            </a>.
          </p>
        </section>

        {/* Sharing */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            8. Data Sharing and Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">We share your data only with:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
            <li><strong>Supabase</strong> — database and authentication hosting</li>
            <li><strong>Vercel</strong> — application hosting</li>
            <li><strong>Google</strong> — identity provider for SSO</li>
            <li><strong>HitPay</strong> — payment processing (when payment features are enabled)</li>
            <li><strong>Email provider</strong> — for sending notifications</li>
            <li><strong>Authorities</strong> — where required by law or valid legal request</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            All third-party processors are bound by data processing agreements.
          </p>
        </section>

        {/* Retention */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li><strong>Account data:</strong> retained while your account is active, deleted within 30 days of account closure</li>
            <li><strong>Booking records:</strong> retained for 3 years for administrative and audit purposes</li>
            <li><strong>Payment records:</strong> retained for 7 years for accounting and tax compliance</li>
            <li><strong>Audit logs:</strong> retained for 1 year for security and accountability</li>
            <li><strong>Feedback and lost item reports:</strong> retained until resolved, then up to 6 months</li>
          </ul>
        </section>

        {/* Rights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Subject to applicable law, you have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
            <li><strong>Access</strong> the personal data we hold about you</li>
            <li><strong>Correct</strong> inaccurate data</li>
            <li><strong>Delete</strong> your data (subject to legal retention obligations)</li>
            <li><strong>Restrict</strong> or <strong>object</strong> to processing</li>
            <li><strong>Withdraw consent</strong> at any time (for consent-based processing)</li>
            <li><strong>Lodge a complaint</strong> with your data protection authority</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            To exercise these rights, contact us at{' '}
            <strong>mpp@utm.my</strong>. For payment-related data
            requests, we may need to coordinate with HitPay. We respond within 30
            days.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            11. Cookies and Local Storage
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and browser local storage strictly for essential purposes:
            keeping you signed in, maintaining your session, and remembering your
            preferences. We do not use advertising or third-party tracking cookies.
          </p>
        </section>

        {/* Children */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            12. Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Service is not intended for children under 13 (or under 16 in the
            EU). We do not knowingly collect data from children. If you believe a
            child has provided us with personal data, contact us and we will delete
            it.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            13. Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Policy from time to time. Material changes will be
            communicated via the Service or email. Continued use after changes
            constitutes acceptance.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Questions about this Policy? Email <strong>mpp@utm.my</strong>.
          </p>
        </section>

        {/* Footer link */}
        <footer className="border-t border-gray-200 pt-6 mt-10 text-right">
          <Link to="/terms" className="text-blue-600 font-medium hover:underline">
            View Terms of Use →
          </Link>
        </footer>
      </div>
    </div>
  )
}
import { Link, useNavigate } from 'react-router-dom'

export default function TermsOfUse() {
const navigate = useNavigate()
  const lastUpdated = '2 Nov 2026'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
        {/* Header */}
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
        <header className="border-b-2 border-gray-200 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Terms of Use
          </h1>
          <p className="text-sm text-gray-500">
            Last updated: <strong>{lastUpdated}</strong> &nbsp;|&nbsp; Effective:{' '}
            <strong>{lastUpdated}</strong>
          </p>
        </header>

        {/* 1. Acceptance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            These Terms of Use ("Terms") govern your access to and use of the{' '}
            <strong>SUBook - Event and Venue Booking System</strong> (the "Service"), operated by{' '}
            <strong>Majlis Perwakilan Pelajar UTM</strong> ("we", "us", "our").
          </p>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using the Service, you agree to be bound by these Terms
            and our{' '}
            <Link to="/privacy" className="text-blue-600 underline">
              Privacy Policy
            </Link>
            . If you do not agree, you must not use the Service.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
          <p className="text-gray-700 leading-relaxed">
            You must be at least 13 years old (16 in the EU) and, where required, an
            authorised member of Universiti Teknologi Malaysia to use the Service. By using the
            Service, you represent that you meet these requirements.
          </p>
        </section>

        {/* 3. Account */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            3. Account Registration and Security
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>You must sign in using a valid Google account via our Google SSO.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
            <li>You must not share your account or credentials with anyone.</li>
            <li>You must notify us immediately of any unauthorised use of your account.</li>
            <li>We may suspend or terminate accounts that violate these Terms.</li>
          </ul>
        </section>

        {/* 4. Acceptable Use */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Acceptable Use</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            You agree <strong>not</strong> to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Use the Service for any unlawful purpose</li>
            <li>Submit false, misleading, or fraudulent booking requests</li>
            <li>Book venues for purposes unrelated to Universiti Teknologi Malaysia activities</li>
            <li>Attempt to access data or pages outside your assigned role</li>
            <li>Bypass, disable, or interfere with security features (RLS, authentication, audit logs)</li>
            <li>Use automated tools to scrape, overload, or attack the Service</li>
            <li>Upload malware or harmful code</li>
            <li>Harass, threaten, or impersonate others</li>
            <li>Reverse-engineer or copy the Service</li>
          </ul>
        </section>

        {/* 5. Booking Rules */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Booking Rules</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Bookings are subject to venue availability and admin approval.</li>
            <li>You must provide accurate booking details (date, time, purpose, attendee count).</li>
            <li>Bookings that require payment must be paid in full before confirmation; unpaid bookings may expire.</li>
            <li>Bookings may be rejected or cancelled by admins for operational reasons.</li>
            <li>Recurring misuse of bookings may result in loss of booking privileges.</li>
            <li>You are responsible for leaving venues clean and undamaged.</li>
            <li>Any damage caused during your booking may be charged to you or your department.</li>
          </ul>
        </section>

        {/* 6. Payments & Refunds */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            6. Payments and Refunds
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3 italic">
            This section applies only when payment features are enabled. As of the
            "Last updated" date, no payments are required to use the Service.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">6.1 Payment processing</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            Payments are processed by <strong>HitPay</strong>, a third-party payment
            gateway. By making a payment, you agree to HitPay's{' '}
            <a
              href="https://hitpayapp.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="https://hitpayapp.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Privacy Policy
            </a>
            . We do not store your full card or banking credentials.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">6.2 Booking confirmation</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            A booking requiring payment is <strong>not confirmed</strong> until
            payment has been successfully processed and marked "paid" by HitPay.
            Bookings with failed or pending payments may be cancelled automatically
            after <strong>30 minutes</strong>.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">6.3 Pricing and fees</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
            <li>All prices are displayed in <strong>MYR</strong> and include applicable taxes unless stated otherwise.</li>
            <li>Any additional payment processing fee, if shown at checkout, is the responsibility of the user.</li>
            <li>We may change prices at any time; changes do not affect bookings already paid for.</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">6.4 Refund policy</h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            Refunds are at the discretion of Majlis Perwakilan Pelajar and subject to the
            following:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
            <li>Requests must be made within <strong>3-4 days</strong> before the booking date.</li>
            <li>Approved refunds are returned to the original payment method via HitPay within <strong>5–10 business days</strong>.</li>
            <li>No refunds are issued for no-shows or late cancellations.</li>
            <li>Where a booking is cancelled by us, a full refund will be issued.</li>
          </ul>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">6.5 Chargebacks</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you initiate a chargeback or payment dispute through your bank, we may
            suspend your account pending investigation. Fraudulent chargebacks may
            result in permanent account termination.
          </p>

          <h3 className="font-semibold text-gray-800 mt-4 mb-2">6.6 Failed payments</h3>
          <p className="text-gray-700 leading-relaxed">
            We are not responsible for failed payments caused by your bank, card
            issuer, or HitPay outages. If your card is charged but your booking is
            not confirmed, contact <strong>mpp@utm.my</strong> with the
            transaction reference.
          </p>
        </section>

        {/* 7. Roles */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            7. Roles and Permissions
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            The Service assigns you one of the following roles:
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-3 py-2 text-left">Role</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Permissions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-200 px-3 py-2"><strong>Student</strong></td>
                  <td className="border border-gray-200 px-3 py-2">Browse venues, submit bookings, view own bookings, submit feedback</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2"><strong>Staff</strong></td>
                  <td className="border border-gray-200 px-3 py-2">All student permissions, plus view all bookings</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2"><strong>Admin</strong></td>
                  <td className="border border-gray-200 px-3 py-2">Manage venues, approve/reject bookings, view audit logs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Roles are assigned by Majlis Perwakilan Pelajar. Attempting to act outside your
            assigned role is a violation of these Terms.
          </p>
        </section>

        {/* 8. IP */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            8. Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content, code, design, and materials in the Service are owned by
            Majlis Perwakilan Pelajar or its licensors and are protected by copyright and
            other intellectual property laws. You may not copy, modify, distribute,
            or create derivative works without our prior written consent.
          </p>
        </section>

        {/* 9. User Content */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. User Content</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            You retain ownership of content you submit (feedback, lost item reports,
            booking descriptions). By submitting content, you grant us a
            non-exclusive, worldwide, royalty-free licence to use, store, and process
            it for the purpose of operating the Service.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You represent that your content does not infringe any third party's
            rights and is not unlawful, defamatory, or obscene.
          </p>
        </section>

        {/* 10. Third-Party Services */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            10. Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Service relies on third-party providers including Google (SSO),
            Supabase (database/auth), Vercel (hosting), and{' '}
            <strong>HitPay</strong> (payments). Your use of those services is subject
            to their own terms and policies. We are not responsible for third-party
            outages or acts.
          </p>
        </section>

        {/* 11. Availability */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            11. Service Availability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to keep the Service available but do <strong>not</strong> guarantee
            uninterrupted access. We may suspend, modify, or discontinue the Service
            (or any feature) at any time, including for maintenance. We are not
            liable for any loss caused by unavailability.
          </p>
        </section>

        {/* 12. Warranties */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            12. Disclaimer of Warranties
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Service is provided <strong>"as is"</strong> and{' '}
            <strong>"as available"</strong> without warranties of any kind, express
            or implied, including merchantability, fitness for a particular purpose,
            or non-infringement. We do not warrant that the Service will be error-free
            or secure.
          </p>
        </section>

        {/* 13. Liability */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            13. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            To the maximum extent permitted by law, Majlis Perwakilan Pelajar shall not be
            liable for any indirect, incidental, special, consequential, or punitive
            damages, or any loss of data, profits, or bookings, arising from your use
            of the Service. Our total liability for any claim shall not exceed
            RM 0 / the amount you paid us, if any.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are not liable for payment failures, delays, or errors caused by
            HitPay, your bank, or your card issuer. Our maximum liability for
            payment-related claims shall not exceed the amount you paid for the
            affected booking.
          </p>
        </section>

        {/* 14. Indemnity */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Indemnity</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify and hold harmless Majlis Perwakilan Pelajar and its
            officers, employees, and agents from any claim or demand arising from your
            breach of these Terms or your misuse of the Service.
          </p>
        </section>

        {/* 15. Termination */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Termination</h2>
          <p className="text-gray-700 leading-relaxed">
            We may suspend or terminate your access at any time if you violate these
            Terms or if required by law. On termination, your right to use the Service
            ceases immediately. Sections 8, 12, 13, 14, and 16 survive termination.
          </p>
        </section>

        {/* 16. Governing Law */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            16. Governing Law and Disputes
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms are governed by the laws of <strong>Malaysia</strong>. Any
            dispute shall be subject to the exclusive jurisdiction of the courts of{' '}
            <strong>Johor</strong>.
          </p>
        </section>

        {/* 17. Changes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            17. Changes to These Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms from time to time. Material changes will be
            communicated via the Service or email. Continued use after changes
            constitutes acceptance.
          </p>
        </section>

        {/* 18. Contact */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">18. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Questions about these Terms? Email <strong>mpp@utm.my</strong>.
          </p>
        </section>

        {/* Footer link */}
        <footer className="border-t border-gray-200 pt-6 mt-10 text-right">
          <Link to="/privacy" className="text-blue-600 font-medium hover:underline">
            View Privacy Policy →
          </Link>
        </footer>
      </div>
    </div>
  )
}
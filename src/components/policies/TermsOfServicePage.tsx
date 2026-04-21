import { useEffect } from "react";

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              GoFix&Clean – Simple Terms & Conditions
            </h2>
            <p className="text-gray-600 italic mb-6">Last Updated: April 2026</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Service Overview
                </h3>
                <p className="text-gray-700">
                  GoFix&Clean connects clients with independent service providers (cleaners, plumbers, electricians, painters, handymen, etc.) in Kigali, Rwanda. We aim to provide reliable, timely, and professional services. Our platform acts as a facilitator between clients and workers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. Booking & Confirmation
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>All bookings must be confirmed by GoFix&Clean before a worker is assigned</li>
                  <li>Clients must provide accurate location, time, and service details</li>
                  <li>A booking is considered confirmed once both client and worker agree on the time and service</li>
                  <li>Changes to confirmed bookings must be communicated to GoFix&Clean as soon as possible</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Payments
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Payments can be made via Mobile Money or Bank transfer (as agreed during booking)</li>
                  <li>GoFix&Clean may collect payment and deduct a service commission before paying the worker</li>
                  <li>All payments are tracked and recorded securely</li>
                  <li>Payment confirmation will be provided to both parties</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  4. Cancellation Policy
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>If a client cancels before a worker is dispatched, no cancellation fee applies</li>
                  <li>If a client cancels after a worker has been dispatched or arrives on-site, a cancellation fee may apply to compensate the worker (e.g., transport cost)</li>
                  <li>Clients are encouraged to cancel in advance to avoid charges</li>
                  <li>Worker cancellations will be handled by GoFix&Clean with fair compensation and rebooking options</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  5. Worker Responsibility
                </h3>
                <p className="text-gray-700 font-semibold mb-2">Workers must:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Show up on time at the agreed location</li>
                  <li>Deliver the agreed service professionally and to the best of their ability</li>
                  <li>Communicate any delays in advance to the client</li>
                  <li>Treat clients and their property with respect</li>
                  <li>Complete the service as discussed or provide a reasonable explanation</li>
                </ul>
                <p className="text-gray-700 font-semibold mt-3 mb-2">
                  If a worker fails to show up:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>GoFix&Clean will arrange a replacement worker at no extra cost to the client</li>
                  <li>If no replacement is available, a full refund will be provided</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  6. Client Responsibility
                </h3>
                <p className="text-gray-700 font-semibold mb-2">Clients must:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate and complete information about the service needed</li>
                  <li>Be available at the agreed time or communicate changes in advance</li>
                  <li>Treat workers respectfully and provide safe working conditions</li>
                  <li>Ensure payment is ready at the time of service</li>
                  <li>Report any issues or concerns immediately</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  7. Liability & Trust
                </h3>
                <p className="text-gray-700 mb-3">
                  GoFix&Clean acts as a service facilitator between clients and workers. While we aim to ensure quality, we are not responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Misuse of services by either party</li>
                  <li>False information provided by users</li>
                  <li>Damage caused by worker negligence (worker's personal liability)</li>
                  <li>Client dissatisfaction without valid complaints</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>However, we actively resolve disputes fairly</strong> and will take appropriate action if either party violates these terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  8. Dispute Resolution
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Disputes must be reported to GoFix&Clean within 24 hours of the service</li>
                  <li>We will investigate and mediate between clients and workers</li>
                  <li>Refunds or credits may be issued based on the nature of the complaint</li>
                  <li>GoFix&Clean's decision is final in dispute resolution</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  9. User Conduct
                </h3>
                <p className="text-gray-700">
                  Users agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                  <li>Harass, threaten, or discriminate against workers or clients</li>
                  <li>Provide false information or attempt to defraud the platform</li>
                  <li>Use the platform for illegal activities</li>
                  <li>Disrupt the service or platform functionality</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  10. Changes to Terms
                </h3>
                <p className="text-gray-700">
                  These terms may be updated as the platform grows and improves. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of updated terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  11. Contact Information
                </h3>
                <p className="text-gray-700">
                  For questions about these terms, contact us at:
                </p>
                <div className="mt-3 text-gray-700 space-y-2">
                  <p><strong>Email:</strong> gofixclean@gmail.com</p>
                  <p><strong>Phone:</strong> +250 780 816 439</p>
                  <p><strong>Location:</strong> Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t pt-6 mt-12">
            <p className="text-sm text-gray-600 text-center">
              Last Updated: April 2026 | GoFix&Clean
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

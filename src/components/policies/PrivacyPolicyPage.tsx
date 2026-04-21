import { useEffect } from "react";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              GoFix&Clean – Privacy Policy
            </h2>
            <p className="text-gray-600 italic mb-6">Last Updated: April 2026</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Information We Collect
                </h3>
                <p className="text-gray-700">
                  We may collect the following information from you:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Location</li>
                  <li>Service details and preferences</li>
                  <li>Email address</li>
                  <li>Payment information (handled securely through payment channel agreed)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. How We Use Information
                </h3>
                <p className="text-gray-700">
                  Your information is used to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                  <li>Match clients with appropriate service workers</li>
                  <li>Manage and track bookings</li>
                  <li>Communicate service updates and confirmations</li>
                  <li>Process payments and service compensation</li>
                  <li>Improve our platform and services</li>
                  <li>Resolve disputes and provide customer support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Data Sharing
                </h3>
                <p className="text-gray-700 mb-3">
                  We only share necessary information between parties to facilitate services:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Client ↔ Worker:</strong> Contact details and service information is shared so the worker can communicate with the client about the service
                  </li>
                  <li>
                    <strong>Internal Use:</strong> Team members may access information necessary to manage bookings and resolve issues
                  </li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>We do NOT sell, rent, or misuse your data.</strong> Your information is never shared with third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  4. Data Protection
                </h3>
                <p className="text-gray-700">
                  We take reasonable steps to keep your information safe and confidential through:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                  <li>Secure password protection on accounts</li>
                  <li>Encrypted transmission of sensitive data</li>
                  <li>Limited access to personal information by authorized staff only</li>
                  <li>Regular security reviews and updates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  5. Data Retention & Deletion
                </h3>
                <p className="text-gray-700">
                  For client security and service history:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                  <li>Personal data is retained while your account is active</li>
                  <li>Upon job and payment completion, personal data may be deleted upon request</li>
                  <li>Service history may be retained for dispute resolution and platform improvement</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  6. Consent
                </h3>
                <p className="text-gray-700">
                  By using GoFix&Clean, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                  <li>The collection and use of your information as described in this policy</li>
                  <li>The sharing of necessary information between clients and workers</li>
                  <li>Our privacy practices and data protection measures</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  7. Changes to This Privacy Policy
                </h3>
                <p className="text-gray-700">
                  We may update this privacy policy as our platform grows and improves. Changes will be posted on this page, and we encourage you to review it periodically.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  8. Contact Us
                </h3>
                <p className="text-gray-700">
                  If you have questions about this privacy policy or how we handle your information, contact us at:
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

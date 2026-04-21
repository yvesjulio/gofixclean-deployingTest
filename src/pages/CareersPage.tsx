import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CareersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Careers at GoFix&Clean
          </h1>
          <p className="text-lg text-gray-600">
            Join our team and help us connect Rwanda with trusted service providers
          </p>
        </div>

        {/* No Openings Message */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Current Openings
              </h2>
              <p className="text-gray-600 mb-4">
                We're currently not hiring, but we're always looking for talented individuals to join our team in the future. GoFix&Clean is growing, and we'll be adding positions as we expand our operations across Rwanda.
              </p>
              <p className="text-gray-600">
                If you're interested in working with us, please get in touch using the contact information below, and we'll keep your information on file for future opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To empower service providers and create employment opportunities while delivering exceptional service to households across Rwanda.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What We Value</h3>
            <ul className="text-gray-600 space-y-2">
              <li>✓ Reliability and professionalism</li>
              <li>✓ Customer-focused mindset</li>
              <li>✓ Innovation and growth</li>
              <li>✓ Community impact</li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to be part of our journey?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact us to express your interest or inquire about future opportunities.
          </p>
          <div className="space-y-3">
            <p className="flex items-center justify-center gap-2 text-gray-600">
              <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              gofixclean@gmail.com
            </p>
            <p className="flex items-center justify-center gap-2 text-gray-600">
              <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.418 1.738 1.48 2.753 3.307 4.57 1.827 1.818 2.835 2.878 4.57 3.295l.773-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57C5.9 18 2 14.1 2 9.429V5z" />
              </svg>
              +250 780 816 439
            </p>
            <p className="flex items-center justify-center gap-2 text-gray-600">
              <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Kigali, Rwanda
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { LuPhone } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { CgMail } from "react-icons/cg";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <CgMail className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <a
              href="mailto:gofixclean@gmail.com"
              className="text-orange-500 hover:text-orange-600 font-semibold break-all"
            >
              gofixclean@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <LuPhone className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
            <a
              href="tel:+250780816439"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              +250 780 816 439
            </a>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <CiLocationOn className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600 font-semibold">Kigali, Rwanda</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="+250 7XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="What is this about?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Tell us more about your inquiry..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                What is GoFix&Clean?
              </h4>
              <p className="text-gray-600">
                GoFix&Clean is a platform that connects clients with trusted service providers such as plumbers, electricians, cleaners, painters, and handymen in Kigali, Rwanda.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How do I book a service?
              </h4>
              <p className="text-gray-600">
                Visit our Services page, select the category you need, choose your preferred provider, and follow the booking process. Our team will confirm your booking and send you a provider.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept Mobile Money and Bank transfers. Payment details will be shared with you during the booking confirmation process.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How quickly can you send a service provider?
              </h4>
              <p className="text-gray-600">
                Response time depends on provider availability and your location. We'll work to assign a provider as soon as possible after booking confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

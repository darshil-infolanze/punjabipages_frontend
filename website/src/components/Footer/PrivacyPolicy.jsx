import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when page loads
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-20 lg:px-40">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Privacy Policy for Punjabi Pages
        </h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: 12.09.2024</p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Punjabi Pages (“we”, “us”, “our”) is committed to protecting your
          privacy. This Privacy Policy outlines how we collect, use, disclose,
          and safeguard your personal information when you use our website,
          mobile applications, and services.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-2">
            We may collect the following types of information:
          </p>

          <h3 className="font-medium text-gray-800 mt-4">a. Personal Information</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Name, email address, phone number</li>
            <li>Business details (for listings)</li>
            <li>Location data</li>
            <li>Profile photo or logo (if uploaded)</li>
            <li>Languages</li>
          </ul>

          <h3 className="font-medium text-gray-800 mt-4">b. Usage Data</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Pages visited</li>
            <li>Time spent on the site</li>
            <li>Clicks and interactions</li>
            <li>Device type and browser information</li>
          </ul>

          <h3 className="font-medium text-gray-800 mt-4">c. Cookies and Tracking Technologies</h3>
          <p className="text-gray-700">
            We use cookies and similar technologies to enhance user experience,
            analyze traffic, and personalize content.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Provide and improve our services</li>
            <li>Facilitate business listings and user interactions</li>
            <li>Send updates, newsletters, and promotional content (with consent)</li>
            <li>Respond to inquiries and support requests</li>
            <li>Monitor and analyze usage trends</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Sharing Your Information
          </h2>
          <p className="text-gray-700 mb-2">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Service providers who assist in operating our platform</li>
            <li>Businesses listed on Punjabi Pages (if you engage with them)</li>
            <li>Legal authorities if required by law</li>
            <li>Analytics and advertising partners (non-identifiable data only)</li>
          </ul>
          <p className="text-gray-700 mt-2">
            We do not sell your personal information to third parties.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Data Storage and Security
          </h2>
          <p className="text-gray-700">
            Your data is stored securely using industry-standard encryption and
            access controls. We take reasonable steps to protect your
            information from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Your Rights
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Access and update your personal information</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="text-gray-700 mt-2">
            To exercise these rights, contact us at{" "}
            <span className="font-semibold text-blue-600">
              hello@punjabipages.com
            </span>.
          </p>
        </section>

        {/* Section 6–9 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Third-Party Links
          </h2>
          <p className="text-gray-700">
            Our platform may contain links to external websites. We are not
            responsible for the privacy practices of these third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Children’s Privacy
          </h2>
          <p className="text-gray-700">
            Punjabi Pages is not intended for use by individuals under the age
            of 18. We do not knowingly collect personal information from
            children.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with the updated date. Continued use of our
            services after changes indicates acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            9. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have questions or concerns about this Privacy Policy, please
            contact us:
          </p>
          <ul className="list-none text-gray-700 mt-2 space-y-1 ml-4">
            <li>📧 <strong>hello@punjabipages.com</strong></li>
            <li>📞 <strong>1800 PUNJABI</strong></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

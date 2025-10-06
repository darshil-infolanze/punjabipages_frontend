import React from "react";

const TermsCondition = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Header */}
        <div className="text-start mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500">
            Last updated: <span className="font-medium">12.09.2024</span>
          </p>
        </div>

        {/* Intro */}
        <p className="text-gray-600 leading-relaxed mb-6">
          These Terms and Conditions (“Terms”) govern your use of Punjabi Pages (“Platform”),
          including our website, mobile applications, and services. By accessing or using the
          Platform, you agree to be bound by these Terms. If you do not agree, please refrain from
          using the Platform.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600">
            By accessing or using Punjabi Pages, you agree to comply with and be bound by these
            Terms and Conditions. If you do not agree with any part, please discontinue use of the
            Platform.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><span className="font-medium">User:</span> Any individual or entity accessing the Platform.</li>
            <li><span className="font-medium">Business:</span> Any entity listing services or products on the Platform.</li>
            <li><span className="font-medium">Content:</span> Text, images, reviews, listings, or other materials posted or displayed.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Eligibility</h2>
          <p className="text-gray-600">
            You must be at least 18 years old to use Punjabi Pages. By using the Platform, you
            represent and warrant that you meet this requirement.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Use of the Platform</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Users may browse, search, and interact with listed businesses.</li>
            <li>Businesses may create profiles, list services, and engage with users.</li>
            <li>
              You agree not to use the Platform for unlawful, abusive, or fraudulent purposes.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Business Listings</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Businesses must provide accurate and up-to-date information.</li>
            <li>Punjabi Pages reserves the right to verify, modify, or remove listings.</li>
            <li>Premium listings may be subject to additional terms and fees.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Reviews and Ratings</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Users may post reviews based on genuine experiences.</li>
            <li>
              Punjabi Pages may moderate or remove reviews that are offensive, false, or violate
              these Terms.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              All content on the Platform, including logos, design, and text, is the property of
              Punjabi Pages or its licensors.
            </li>
            <li>
              You may not copy, reproduce, or distribute content without prior written consent.
            </li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Privacy</h2>
          <p className="text-gray-600">
            Your use of the Platform is governed by our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>, which explains how we collect, use, and protect your information.
          </p>
        </section>

        {/* Section 9–16 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Links</h2>
          <p className="text-gray-600">
            Punjabi Pages may contain links to third-party websites. We are not responsible for
            their content or practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Mobile App Usage</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>The Punjabi Pages app is available on Google Play and the App Store.</li>
            <li>App usage is subject to these Terms and app store policies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Termination</h2>
          <p className="text-gray-600">
            Punjabi Pages may suspend or terminate your access for violations of these Terms or
            other reasons deemed appropriate.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Disclaimers</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              Punjabi Pages does not guarantee the accuracy or reliability of business listings or
              user reviews.
            </li>
            <li>
              We are not liable for any damages arising from use of the Platform.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Limitation of Liability</h2>
          <p className="text-gray-600">
            To the maximum extent permitted by law, Punjabi Pages shall not be liable for any
            loss, damage, or injury resulting from your use of the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Indemnification</h2>
          <p className="text-gray-600">
            You agree to indemnify and hold harmless Punjabi Pages, its affiliates, and employees
            from any claims or liabilities arising from your use of the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Changes to Terms</h2>
          <p className="text-gray-600">
            We may update these Terms from time to time. Continued use of the Platform after
            changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">16. Governing Law</h2>
          <p className="text-gray-600">
            These Terms are governed by the laws of NSW, Australia. Any disputes shall be resolved
            in the courts of NSW.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">17. Contact Us</h2>
          <p className="text-gray-600">
            For questions or concerns, please contact us:
          </p>
          <div className="mt-3 space-y-1 text-gray-700">
            <p>
              📧{" "}
              <a href="mailto:hello@punjabipages.com" className="text-blue-600 hover:underline">
                hello@punjabipages.com
              </a>
            </p>
            <p>📞 1800 PUNJABI</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsCondition;

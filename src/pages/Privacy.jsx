import Breadcrumb from "@/components/Breadcrumb";
import { Helmet } from "react-helmet";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - JobKonnectaNG</title>
        <meta name="description" content="Privacy Policy for JobKonnectaNG" />
        <meta property="og:title" content="Privacy Policy - JobKonnectaNG" />
        <meta
          property="og:description"
          content="Privacy Policy for JobKonnectaNG"
        />
       
        <meta
          property="og:url"
          content="https://www.jobkonnectaNG.com/privacy"
        />
      </Helmet>
      <Breadcrumb title1="Privacy Policy" title2={""} />
      <div className="w-[95%] mx-auto my-5 flex flex-col gap-3 text-left">
        <p className="text-primary font-[400]">
          JobKonnectaNG is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website
          [www.jobkonnectaNG.com] . Please read this Privacy Policy
          carefully. If you do not agree with the terms of this Privacy Policy,
          please do not access the Site.
        </p>

        <p className="text-primary font-[400]">1. Information We Collect</p>
        <p className="text-primary font-[400]">
          We may collect information about you in a variety of ways. The
          information we may collect on the Site includes:
        </p>
        <p className="text-primary font-[400]">
          <strong>Personal Data</strong>
          <br />
          Personally identifiable information, such as your name, shipping
          address, email address, and telephone number, and demographic
          information, such as your age, gender, hometown, and interests, that
          you voluntarily give to us when you register with the Site or when you
          choose to participate in various activities related to the Site, such
          as online chat and message boards.
        </p>
        <p className="text-primary font-[400]">
          <strong>Derivative Data</strong>
          <br />
          Information our servers automatically collect when you access the
          Site, such as your IP address, your browser type, your operating
          system, your access times, and the pages you have viewed directly
          before and after accessing the Site.
        </p>
        <p className="text-primary font-[400]">
          <strong>Financial Data</strong>
          <br />
          Financial information, such as data related to your payment method
          (e.g., valid credit card number, card brand, expiration date) that we
          may collect when you purchase, order, return, exchange, or request
          information about our services from the Site. We store only very
          limited, if any, financial information that we collect.
        </p>
        <p className="text-primary font-[400]">
          <strong>Mobile Device Data</strong>
          <br />
          Device information, such as your mobile device ID, model, and
          manufacturer, and information about the location of your device, if
          you access the Site from a mobile device.
        </p>

        <p className="text-primary font-[400]">2. Use of Your Information</p>
        <p className="text-primary font-[400]">
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the Site to:
        </p>
        <ul className="text-primary font-[400] custom-list list-inside">
          <li>Create and manage your account.</li>
          <li>
            Process your transactions and send you related information,
            including purchase confirmations and invoices.
          </li>
          <li>Email you regarding your account or order.</li>
          <li>
            Fulfill and manage purchases, orders, payments, and other
            transactions related to the Site.
          </li>
          <li>Administer sweepstakes, promotions, and contests.</li>
          <li>
            Generate a personal profile about you to make future visits to the
            Site more personalized.
          </li>
          <li>Increase the efficiency and operation of the Site.</li>
          <li>
            Monitor and analyze usage and trends to improve your experience with
            the Site.
          </li>
          <li>Notify you of updates to the Site.</li>
          <li>
            Offer new products, services, mobile applications, and/or
            recommendations to you.
          </li>
          <li>Perform other business activities as needed.</li>
          <li>
            Prevent fraudulent transactions, monitor against theft, and protect
            against criminal activity.
          </li>
          <li>Process payments and refunds.</li>
          <li>Request feedback and contact you about your use of the Site.</li>
          <li>Resolve disputes and troubleshoot problems.</li>
          <li>Respond to product and customer service requests.</li>
          <li>Send you a newsletter.</li>
        </ul>

        <p className="text-primary font-[400]">
          3. Disclosure of Your Information
        </p>
        <p className="text-primary font-[400]">
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <p className="text-primary font-[400]">
          <strong>By Law or to Protect Rights</strong>
          <br />
          If we believe the release of information about you is necessary to
          respond to legal process, to investigate or remedy potential
          violations of our policies, or to protect the rights, property, and
          safety of others, we may share your information as permitted or
          required by any applicable law, rule, or regulation.
        </p>
        <p className="text-primary font-[400]">
          <strong>Third-Party Service Providers</strong>
          <br />
          We may share your information with third parties that perform services
          for us or on our behalf, including payment processing, data analysis,
          email delivery, hosting services, customer service, and marketing
          assistance.
        </p>
        <p className="text-primary font-[400]">
          <strong>Business Transfers</strong>
          <br />
          We may share or transfer your information in connection with, or
          during negotiations of, any merger, sale of company assets, financing,
          or acquisition of all or a portion of our business to another company.
        </p>
        <p className="text-primary font-[400]">
          <strong>Third-Party Advertisers</strong>
          <br />
          We may use third-party advertising companies to serve ads when you
          visit the Site. These companies may use information about your visits
          to the Site and other websites that are contained in web cookies to
          provide advertisements about goods and services of interest to you.
        </p>

        <p className="text-primary font-[400]">4. Tracking Technologies</p>
        <p className="text-primary font-[400]">
          We may use cookies, web beacons, tracking pixels, and other tracking
          technologies on the Site to help customize the Site and improve your
          experience. When you access the Site, your personal information is not
          collected through the use of tracking technology.
        </p>

        <p className="text-primary font-[400]">
          5. Security of Your Information
        </p>
        <p className="text-primary font-[400]">
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide to us, please be
          aware that despite our efforts, no security measures are perfect or
          impenetrable, and no method of data transmission can be guaranteed
          against any interception or other types of misuse.
        </p>

        <p className="text-primary font-[400]">6. Policy for Children</p>
        <p className="text-primary font-[400]">
          We do not knowingly solicit information from or market to children
          under the age of 13. If we learn that we have collected personal
          information from a child under age 13 without verification of parental
          consent, we will delete that information as quickly as possible.
        </p>

        <p className="text-primary font-[400]">7. Your Privacy Rights</p>
        <p className="text-primary font-[400]">
          You may at any time review or change the information in your account
          or terminate your account by:
        </p>
        <ul className="text-primary font-[400] custom-list list-inside">
          <li>Logging into your account settings and updating your account.</li>
          <li>Contacting us using the contact information provided below.</li>
        </ul>
        <p className="text-primary font-[400]">
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, some information may be retained in our files to prevent
          fraud, troubleshoot problems, assist with any investigations, enforce
          our Terms of Use, and/or comply with legal requirements.
        </p>

        <p className="text-primary font-[400]">8. Contact Us</p>
        <p className="text-primary font-[400]">
          If you have questions or comments about this Privacy Policy, please
          contact us at:
        </p>
        <p className="text-primary font-[400]">
          JobKonnectaNG
          <br />
          [Email Address]
          <br />
          [Phone Number]
          <br />
          [Physical Address]
          <br />
        </p>
        <p className="text-primary font-[400]">
          By using JobKonnectaNG, you acknowledge that you have read,
          understood, and agree to be bound by this Privacy Policy. Thank you
          for trusting us with your information!
        </p>
      </div>
    </>
  );
}

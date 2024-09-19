import Breadcrumb from "../components/Breadcrumb";
import { Helmet } from "react-helmet";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - JobKonnectaNG</title>
        <meta
          name="description"
          content="Terms & Conditions for JobKonnectaNG"
        />
        <meta
          name="keywords"
          content="terms, conditions, jobkonnecta, jobkonnectang"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Terms & Conditions - JobKonnectaNG"
        />
        <meta
          property="og:description"
          content="Terms & Conditions for JobKonnectaNG"
        />
        
        <meta property="og:url" content="https://www.jobkonnectaNG.com/terms" />
      </Helmet>
      <Breadcrumb title1="Terms & Conditions" title2={""} />
      <div className="w-[95%] mx-auto my-5 flex flex-col gap-3 text-left">
        <p className="text-primary font-[400]">
          Welcome to JobKonnectaNG, a job listing platform designed to connect
          job seekers and employers in Nigeria. By using our website, you agree
          to abide by the following terms and conditions. Please read them
          carefully before using our services. If you do not agree with any part
          of these terms, please do not use our website.
        </p>

        <p className="text-primary font-[400]">
          <strong>1. Acceptance of Terms</strong>
          <br />
          By accessing and using JobKonnectaNG, you accept and agree to be bound
          by these Terms & Conditions and our Privacy Policy. These terms apply
          to all users of the website, including employers, job seekers, and
          visitors.
        </p>

        <p className="text-primary font-[400]">
          <strong>2. Modification of Terms</strong>
          <br />
          JobKonnectaNG reserves the right to modify these terms at any time.
          Any changes will be effective immediately upon posting on the website.
          Your continued use of the website following the posting of changes
          constitutes your acceptance of such changes.
        </p>

        <p className="text-primary font-[400]">
          <strong>3. Eligibility</strong>
          <br />
          To use JobKonnectaNG, you must be at least 18 years old and legally
          capable of entering into binding contracts. By using this website, you
          represent and warrant that you meet these requirements.
        </p>

        <p className="text-primary font-[400]">
          <strong>4. User Accounts</strong>
        </p>
        <ul className="custom-list text-primary font-[400] list-inside ml-4">
          <li>
            <strong>Registration:</strong> To access certain features, you must
            register and create an account. You agree to provide accurate and
            complete information during registration.
          </li>
          <li>
            <strong>Account Security:</strong> You are responsible for
            maintaining the confidentiality of your account details and for all
            activities that occur under your account. You must notify us
            immediately of any unauthorized use of your account.
          </li>
          <li>
            <strong>Termination:</strong> JobKonnectaNG reserves the right to
            suspend or terminate your account at any time for any reason,
            including, but not limited to, violation of these terms.
          </li>
        </ul>

        <p className="text-primary font-[400]">
          <strong>5. Job Listings</strong>
        </p>
        <ul className="custom-list text-primary font-[400] list-inside ml-4">
          <li>
            <strong>Posting Jobs:</strong> Employers can post job listings by
            providing relevant details. Employers must ensure that job postings
            are accurate, lawful, and do not contain misleading information.
          </li>
          <li>
            <strong>Job Applications:</strong> Job seekers can apply for jobs by
            submitting their details as requested in the job listing.
            JobKonnectaNG is not responsible for the content of job applications
            or the actions of employers.
          </li>
        </ul>

        <p className="text-primary font-[400]">
          <strong>6. Prohibited Activities</strong>
        </p>
        <p className="text-primary font-[400]">Users are prohibited from:</p>
        <ul className="custom-list text-primary font-[400] list-inside ml-4">
          <li>Posting false or misleading information.</li>
          <li>
            Posting content that is offensive, discriminatory, or violates any
            laws.
          </li>
          <li>Using the website for any fraudulent or illegal activities.</li>
          <li>Attempting to interfere with the operation of the website.</li>
        </ul>

        <p className="text-primary font-[400]">
          <strong>7. Content Ownership and Usage</strong>
        </p>
        <ul className="custom-list text-primary font-[400] list-inside ml-4">
          <li>
            <strong>User Content:</strong> Users retain ownership of the content
            they submit but grant JobKonnectaNG a non-exclusive, royalty-free
            license to use, display, and distribute such content in connection
            with our services.
          </li>
          <li>
            <strong>Website Content:</strong> All content on JobKonnectaNG,
            including text, graphics, logos, and software, is the property of
            JobKonnectaNG or its licensors and is protected by intellectual
            property laws.
          </li>
        </ul>

        <p className="text-primary font-[400]">
          <strong>8. Disclaimers</strong>
        </p>
        <ul className="custom-list text-primary font-[400] list-inside ml-4">
          <li>
            <strong>No Guarantee:</strong> JobKonnectaNG does not guarantee the
            accuracy, completeness, or reliability of job listings or
            applications. We do not endorse any employer or job seeker.
          </li>
          <li>
            <strong>No Warranty:</strong> The website is provided &quot;as is&quot;
            without any warranties of any kind. JobKonnectaNG disclaims all
            warranties, express or implied, including, but not limited to,
            warranties of merchantability and fitness for a particular purpose.
          </li>
        </ul>

        <p className="text-primary font-[400]">
          <strong>9. Limitation of Liability</strong>
          <br />
          JobKonnectaNG shall not be liable for any direct, indirect,
          incidental, consequential, or punitive damages arising out of or
          related to your use of the website. This includes, but is not limited
          to, damages for loss of profits, goodwill, data, or other intangible
          losses.
        </p>

        <p className="text-primary font-[400]">
          <strong>10. Indemnification</strong>
          <br />
          You agree to indemnify, defend, and hold harmless JobKonnectaNG, its
          affiliates, and their respective officers, directors, employees, and
          agents from any claims, liabilities, damages, losses, and expenses,
          including reasonable attorneys&apos; fees, arising out of or related to
          your use of the website or violation of these terms.
        </p>

        <p className="text-primary font-[400]">
          <strong>11. Governing Law</strong>
          <br />
          These terms and conditions are governed by the laws of Nigeria. Any
          disputes arising out of or related to these terms shall be resolved in
          the courts of Nigeria.
        </p>
      </div>
    </>
  );
}

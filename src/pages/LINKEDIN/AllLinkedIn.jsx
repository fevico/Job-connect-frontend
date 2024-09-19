import Breadcrumb from "@/components/Breadcrumb";
import { Helmet } from "react-helmet";
import LinkedInList from "@/components/LINKEDIN/LinkedInList";

export default function AllLinkedIn() {
  return (
    <>
      <Helmet>
        <title>All LinkedIn Optimizers - JobKonnectaNG</title>
        <meta
          name="description"
          content="All LinkedIn Optimizers - JobKonnectaNG"
        />
        <meta
          name="keywords"
          content="All LinkedIn Optimizers, JobKonnectaNG"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="JobKonnectaNG" />
      </Helmet>
      <Breadcrumb
        title1={"Find A LinkedIn Optimizer to Help You Standout"}
        title2={" Pick a LinkedIn Optimizer to help you organise your LinkedIn profile"}
      />
      <div className="mt-5 w-[95%] mx-auto">
        <LinkedInList />
      </div>
    </>
  );
}

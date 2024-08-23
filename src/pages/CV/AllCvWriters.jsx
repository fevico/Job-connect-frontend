import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Helmet } from "react-helmet";
import CvWriterList from "../../components/CV/CvWriterList";

export default function AllCVWriters() {
  return (
    <>
      <Helmet>
        <title>CV Writer Details - JobKonnectaNG</title>
        <meta name="description" content="CV Writer Details - JobKonnectaNG" />
        <meta name="keywords" content="CV Writer Details, JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="JobKonnectaNG" />
      </Helmet>
      <Breadcrumb
        title1={"Find A CV Writer to Help You Standout"}
        title2={" Pick a CV writer to help you draft your desired CV"}
      />
      <div className="mt-5 w-[95%] mx-auto">
        <CvWriterList />
      </div>
    </>
  );
}

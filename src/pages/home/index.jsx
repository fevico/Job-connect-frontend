import React from "react";
import Hero from "./Hero";
import Offers from "./Offers";
import Featured from "./Featured";
import { Helmet } from "react-helmet";
import Subscription from "./Subscription";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home - JobKonnectaNG</title>
        <meta name="description" content="Home - JobKonnectaNG" />
        <meta name="keywords" content="Home, JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="JobKonnectaNG" />
      </Helmet>
      <Hero />
      <Featured />
      <Subscription />
      <Offers />
    </>
  );
}

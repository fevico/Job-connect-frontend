import Filter from "./Filter";

export default function Hero() {
  return (
    <>
      {/* <div className="relative w-full h-[360px] "> */}
      {/* <img src={hero} alt="Hero Background" className="w-full h-full object-cover filter blur-sm"/> */}
      {/* <div className="absolute inset-0 flex flex-col items-center  text-center"> */}
      <div className="mt-4 lg:mt-8 flex flex-col w-full">
        <h2 className="font-extrabold text-primary text-[27px] lg:text-[45px]">
          Your Dream Job Awaits You!
        </h2>
        <p className="text-[14px] lg:text-[20px] font-semibold">
          Discover Opportunities. Unlock Potential. Build Your Future
        </p>

        <Filter />
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

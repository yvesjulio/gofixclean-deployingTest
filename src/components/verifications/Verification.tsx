import { MdOutlineVerifiedUser } from "react-icons/md";

function Verification() {
  return (
    <div>
      <section className="bg-brandText text-brandWhite px-6 md:px-9 pt-9 md:pt-14 pb-10 text-center">
        <div className="flex justify-center mb-4">
          <MdOutlineVerifiedUser className="text-6xl md:text-6xl text-[#ECECEC]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-[#ECECEC]">
          Provider Verification
        </h1>

        <p className="text-[#C5C5C5] mx-auto max-w-3xl">
          Complete your verification to start receiving jobs on GoFix&Clean
        </p>
      </section>
    </div>
  );
}

export default Verification;

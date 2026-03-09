import { GrStatusGood } from "react-icons/gr";

function Requirements() {
  return (
    <section className="px-4 sm:px-6 md:px-16 py-16">

      
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Requirements
        </h2>
      </div>

     
      <div className="max-w-7xl mx-auto bg-[#ECECEC] text-brandText rounded-xl px-8 py-10  flex flex-col gap-6">

        <div className="flex items-center gap-4">
          <GrStatusGood className="text-3xl shrink-0" />
          <p className="text-base">Be at least 18 years old</p>
        </div>

        <div className="flex items-center gap-4">
          <GrStatusGood className="text-3xl shrink-0" />
          <p className="text-base">Have valid identification documents</p>
        </div>

        <div className="flex items-center gap-4">
          <GrStatusGood className="text-3xl shrink-0" />
          <p className="text-base">Own a smartphone with internet access</p>
        </div>

        <div className="flex items-center gap-4">
          <GrStatusGood className="text-3xl shrink-0" />
          <p className="text-base">Have relevant skills or certifications in your service area</p>
        </div>

        <div className="flex items-center gap-4">
          <GrStatusGood className="text-3xl shrink-0" />
          <p className="text-base">Pass our background verification process</p>
        </div>

        <div className="flex items-center gap-4">
          <GrStatusGood className="text-3xl shrink-0" />
          <p className="text-base">Provide quality service and maintain good ratings</p>
        </div>

      </div>
    </section>
  );
}

export default Requirements;
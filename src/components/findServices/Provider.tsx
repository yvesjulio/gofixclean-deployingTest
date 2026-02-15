import { IoSearchOutline } from "react-icons/io5";

function Provider() {
  return (
    <section className="bg-brandText text-brandWhite px-6 md:px-9 pt-9 md:pt-14 pb-16 text-center">

      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-[#ECECEC]">
        Find a Provider
      </h1>

      <p className="text-[#C5C5C5] mx-auto mb-8 max-w-3xl">
        Search through thousands of verified service providers
      </p>

      <div className="flex justify-center">
        <div className="flex items-center bg-[#ECECEC] rounded-md px-4 py-3 w-full max-w-xl shadow-md">
          
          <IoSearchOutline className="text-[#828282] text-xl mr-3" />

          <input
            type="text"
            placeholder="Search by names, services, or location..."
            className="w-full bg-transparent outline-none text-[#828282] placeholder-[#828282]"
          />
        </div>
      </div>

    </section>
  );
}

export default Provider;

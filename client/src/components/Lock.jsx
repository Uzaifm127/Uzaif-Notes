import Header from "./Header";
import lock from "../assets/padlock.png";

const Lock = () => {
  return (
    <>
      <Header />
      <section className="flex flex-col mt-10 items-center ">
        <img className="h-40 sm:h-60 pointer-events-none" src={lock} alt="lock" />
        <p className="my-10 text-2xl text-slate-400 pointer-events-none">
          Please login or signup first
        </p>
      </section>
    </>
  );
};

export default Lock;

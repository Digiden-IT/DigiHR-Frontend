import img6 from "../../assets/img6.png";
import img7 from "../../assets/img7.svg";
import Hi_Benner from "../../assets/Hi_Benner.webp";


import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const GreetingBanner = () => {
  const user = useAppSelector(selectCurrentUser);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 6) return "You're up early! Good early morning";
    if (hour < 11) return "Good morning !!";
    if (hour < 13) return "Good noon !!";
    if (hour < 17) return "Good afternoon !!";
    if (hour < 20) return "Good evening !!";
    else return "What's up Owl? it's late !!";
    return "Good night";
  };
  return (
    // <div className="relative mb-6 h-[200px] ">
    //   <img
    //     src={img7}
    //     alt="Greetings Banner"
    //     className="w-full h-full mb-4 rounded-lg object-cover"
    //   />
    //   {/* <div className="absolute  top-14 left-24 md:left-72 ">
    //     <div className=" text-3xl font-semibold ">
    //       Hi,{" "}
    //       <span className="text-red-800 text-3xl font-semibold">
    //         {user?.name} 👋
    //       </span>
    //     </div>
    //     <div className="text-2xl text-blue-800 font-semibold">
    //       {getTimeGreeting()}
    //     </div>
    //   </div> */}
    // </div>
    <div
      className="relative mb-6 h-[200px] w-full rounded-lg bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${img6})`,
      }}
    >
      <div className="absolute top-32 left-32 md:left-44">
        <div className="text-2xl font-semibold">
          Hi,{" "}
          <span className="text-red-800 text-3xl font-bold">
            {user?.name} 👋
          </span>
        </div>
        <div className="text-2xl text-blue-800 font-semibold">
          {getTimeGreeting()}
        </div>
      </div>
    </div>
  );
};

export default GreetingBanner;

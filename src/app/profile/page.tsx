"use server"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getUserPersonalityDistribution } from "../actions/User";
import ChartThree from "@/components/Charts/ChartThree";

const Profile = async() => {
  const personaliytDistribution = await getUserPersonalityDistribution(5)
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3 flex justify-center items-center">
              <p className="text-7xl max-sm:text-5xl font-bold text-sky-950 dark:text-white text-center">
                MN
              </p>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                Med Mouhib Naffeti
              </h3>
              <p className="font-medium">187546E487 </p>
              <p className="font-medium">mouhamednaffeti@gmail.com </p>
              <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 px-4">
                  <span className="text-sm">Dominant Personality</span>
                  <span className="font-semibold text-black dark:text-white">
                    Autistic
                  </span>
                </div>
              </div>
              <div className="mt-5 max-w-[28rem] mx-auto">
                <ChartThree personalityDistribution={personaliytDistribution} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;

"use server"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getUserPersonalityDistribution } from "../actions/User";
import UserProfileClient from "@/components/common/pages/UserProfileClient";

const Profile = async() => {
  const personaliytDistribution = await getUserPersonalityDistribution(5)
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />
        <UserProfileClient personaliytDistribution={personaliytDistribution} />
      </div>
    </DefaultLayout>
  );
};

export default Profile;

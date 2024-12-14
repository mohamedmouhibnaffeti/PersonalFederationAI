"use server"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getUserPersonalityDistribution } from "../actions/User";
import UserProfileClient from "@/components/common/pages/UserProfileClient";

const Profile = async() => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />
        <UserProfileClient/>
      </div>
    </DefaultLayout>
  );
};

export default Profile;

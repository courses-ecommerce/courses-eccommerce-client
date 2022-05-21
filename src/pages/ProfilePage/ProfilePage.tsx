import React, { useEffect } from "react";
import accountApi from "src/apis/accountApi";

const ProfilePage = () => {
  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const res = await accountApi.getMe();
      console.log("dsfds", res);
    } catch (error) {
      console.log("lỗi r", { error });
    }
  };

  return <div>ProfilePage</div>;
};

export default ProfilePage;

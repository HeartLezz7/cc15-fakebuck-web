import { useState } from "react";
import Avatar from "../../components/Avatar";
import { useAuth } from "../../hooks/use-auth";
import CoverImage from "./CoverImage";
import PictureForm from "./PictureForm";
import Loading from "../../components/Loading";

export default function EditProfileForm({ onSuccess }) {
  const { authUser, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const uploadProfileImage = async (input) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", input); // application/json == sent datatype(string,int,boolean,object,array),mlutipart/form-data == can sent binary type(file)
      setLoading(true);
      await updateProfile(formData);
      onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadCoverImage = async (input) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", input); // application/json == sent datatype(string,int,boolean,object,array),mlutipart/form-data == can sent binary type(file)
      setLoading(true);
      await updateProfile(formData);
      onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {loading && <Loading />}
      <PictureForm
        title="Profile picture"
        initailSrc={authUser.profileImage}
        onSave={uploadProfileImage}
      >
        {(src, onClick) => (
          <div onClick={onClick}>
            <Avatar className="h-40" src={src} />
          </div>
        )}
      </PictureForm>
      <PictureForm
        title="Cover photo"
        initailSrc={authUser.coverImage}
        onSave={uploadCoverImage}
      >
        {(src, onClick) => (
          <div
            className="aspect-[3/1] overflow-hidden rounded-md flex items-center justify-center"
            onClick={onClick}
          >
            <CoverImage src={src} />
          </div>
        )}
      </PictureForm>
    </div>
  );
}

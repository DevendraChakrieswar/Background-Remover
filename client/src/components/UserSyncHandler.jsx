import { useAuth, useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {

    const {isLoaded, isSignedIn, getToken} = useAuth();

    const {user} = useUser();

    const [synced, setSynced] = useState(false);

    const {backendUrl, loadUserCredits} = useContext(AppContext);


    useEffect(() => {

        const saveUser = async () => {
            if(!isLoaded || !isSignedIn || synced) {
                return;
            }

            try {
                const token = await getToken();

                const userData = {
                    clerkId: user.id,
                    email: user.primaryEmailAddress.emailAddress,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photoUrl: user.imageUrl
                }

                // console.log(userData);

                await axios.post(backendUrl + "/users", userData, {
                    headers: { Authorization: `Bearer ${token}`}
                });

                // if(response.data.success === true) {
                //     console.log("User successfully created!");
                //     toast.success("User successfully created!");
                // } else {
                //     toast.error("User sync failed. Please try again!");
                // }
                setSynced(true); // to revent re-posting

                await loadUserCredits();

                toast.success("User synced successfully");

            } catch(err) {
                console.error("User sync falied", err);
                toast.error("User Sync failed. Please try again!");
            }
        };
        saveUser();

    },[isLoaded, isSignedIn, getToken, user, synced]);

    return null;
}

export default UserSyncHandler;
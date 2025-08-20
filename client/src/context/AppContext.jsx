import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ( props ) => {

    const [credits, setCredits] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const {getToken} = useAuth();

    const [image, setImage] = useState(false);

    const [resultImage, setResultImage] = useState(false);

    const {isSignedIn} = useUser();

    const {openSignIn} = useClerk();

    const navigate = useNavigate();

   const loadUserCredits = async() => {
        try {
            const token = await getToken();
            // console.log(token);
            const response = await axios.get(backendUrl + "/users/credits", {headers: {Authorization: `Bearer ${token}`}});
            // console.log(response);
            if(response.data.success) {
                setCredits(response.data.data.credits);
                
            } else {
                toast.error("Error in loading the credits");
            }

        } catch (error) {
            console.log("Error in loading credits", error);
            toast.error("Error loading the credits")
        }
   }

   const removeBg = async (selectedImage) => {
    try {

        if(!isSignedIn) {
            return openSignIn();
        }

        setImage(selectedImage);
        setResultImage(false);

        // navigate to result page
        navigate("/result");

        const formData = new FormData();
        const token = await getToken();

        selectedImage && formData.append("file", selectedImage);

        const {data: base64Image} = await axios.post(backendUrl + "/images/remove-background", formData, {headers: {Authorization: `Bearer ${token}`}});

        setResultImage(`data:image/png;base64, ${base64Image}`);
        setCredits(credits-1);

    } catch(error) {
        console.error(error);
        toast.error("Error while removing background image.");
    }
   }



    const contextValue = {
        credits, setCredits,
        image, setImage,
        resultImage, setResultImage,
        backendUrl,
        removeBg,
        loadUserCredits
    }

    return(
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;
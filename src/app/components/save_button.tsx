import { Button } from "@mui/material";
import { ProfileData } from "./profile";

export default function SaveProfile({
    profile,
    colorEmote,
    colorMessage,
    colorQuote
}: {
    profile: string,
    colorEmote: string,
    colorMessage: string,
    colorQuote: string
}) {

    const saveProfile = () => {
        const profiles = localStorage.getItem("profiles") || "[]";
        const storedProfiles: ProfileData[] = JSON.parse(profiles);

        const index = storedProfiles.findIndex((profileData) => profileData.profile === profile);
        if (index === -1) {
            storedProfiles.push({
                profile,
                colorEmote,
                colorMessage,
                colorQuote,
            });
        } else {
            storedProfiles[index] = {
                profile,
                colorEmote,
                colorMessage,
                colorQuote,
            };
        }

        localStorage.setItem("profiles", JSON.stringify(storedProfiles));
    }

    return (
        <Button onClick={saveProfile}>Save</Button>
    )
}
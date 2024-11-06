import { Button } from "@mui/material";
import { ProfileData } from "./profile";

export default function NewProfile({
    onChange
}: {
    onChange: (profiles: ProfileData[]) => void
}) {

    const saveProfile = () => {
        const profiles = localStorage.getItem("profiles") || "[]";
        const storedProfiles: ProfileData[] = JSON.parse(profiles);

        // request from alert
        const profile = prompt("Profile name") || "Default";

        const index = storedProfiles.findIndex((profileData) => profileData.profile === profile);
        if (index === -1) {
            storedProfiles.push({
                profile,
                colorEmote: "#ffffff",
                colorMessage: "#ffffff",
                colorQuote: "#ffffff",
            });
        } else {
            storedProfiles[index] = {
                profile,
                colorEmote: "#ffffff",
                colorMessage: "#ffffff",
                colorQuote: "#ffffff",
            };
        }
        
        onChange(storedProfiles);
        localStorage.setItem("profiles", JSON.stringify(storedProfiles));
    }

    return (
        <Button onClick={saveProfile}>Create</Button>
    )
}
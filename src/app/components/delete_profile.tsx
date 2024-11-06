import { Button } from "@mui/material";
import { ProfileData } from "./profile";

export default function RemoveProfile({
    onChange
}: {
    onChange: (profiles: ProfileData[]) => void
}) {
    const removeProfile = () => {
        const profiles = localStorage.getItem("profiles") || "[]";
        const storedProfiles: ProfileData[] = JSON.parse(profiles);

        // request from alert
        const profile = prompt("Profile name") || "Default";
        
        const index = storedProfiles.findIndex((profileData) => profileData.profile === profile);
        if (index !== -1) {
            storedProfiles.splice(index, 1);
        }

        onChange(storedProfiles);
        localStorage.setItem("profiles", JSON.stringify(storedProfiles));
    }

    return (
        <Button onClick={removeProfile}>Remove</Button>
    )
}
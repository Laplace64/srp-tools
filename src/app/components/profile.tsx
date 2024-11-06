import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

export interface ProfileData {
    profile: string,
    colorEmote: string,
    colorMessage: string,
    colorQuote: string,
}

export default function ProfileSelect(props: { profiles?: ProfileData[], onChange: (profile: string) => void }): JSX.Element {
    const { profiles, onChange } = props;

    const profileNames = useMemo(() => {
        return profiles ? profiles.map((profile) => profile.profile) : [];
    }, [profiles]);

    const [activeProfile, setActiveProfile] = useState("");

    useEffect(() => {
        if (profileNames.length > 0 && activeProfile === "") {
            setActiveProfile(profileNames[0]);
            onChange(profileNames[0]);
        }
    }, [profiles, activeProfile, onChange, profileNames]);


    return (
        <FormControl fullWidth style={{ color: "white" }}>
            <InputLabel>
                Profile
            </InputLabel>

            <Select label="Profile" onChange={(e) => {
                onChange(e.target.value);
                setActiveProfile(e.target.value);
            }} value={activeProfile}>
                {
                    profileNames.map((profile) => {
                        return (
                            <MenuItem key={profile} value={profile}>
                                {profile}
                            </MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    )
}
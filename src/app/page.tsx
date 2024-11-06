'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Ferris from "../../public/ferris.svg";

import "react-color-palette/css";
import ProfileSelect, { ProfileData } from './components/profile';
import RichFormat from './components/rich_format';
import RecentColours from './components/recent_colors';
import ColorBox from './components/colorbox';
import CopyButton from './components/copy_button';
import NewProfile from './components/new_profile';
import RemoveProfile from './components/delete_profile';
import StoredColors, { IStoredColor } from './components/stored_colors';
import { useBoolean, useLocalStorage } from 'usehooks-ts';
import { Acknowledgements } from './components/acknowledgements';


export default function Home() {
  const options = { initializeWithValue: false };

  const [text, setText] = useLocalStorage("text", "", options);
  const [fullText, setFullText] = useState("");
  const [colorEmote, setColorEmote] = useState("colorEmote");
  const [colorMessage, setColorMessage] = useState("colorMessage");
  const [colorQuote, setColorQuote] = useState("colorQuote");

  const [profile, setProfile] = useState("");
  const [profiles, setProfiles] = useLocalStorage<ProfileData[]>("profiles", [], options);
  const [storedColors, setStoredColors] = useLocalStorage<IStoredColor[]>("storedColors", [], options);

  console.log(`Stored colors: ${storedColors}`);

  const { value: colorChanged, toggle } = useBoolean(false);

  useEffect(() => {
    // update this in profiles

    const idx = profiles.findIndex(p => p.profile === profile);
    if (idx != -1) {
      const profile = profiles[idx];
      profile.colorEmote = colorEmote;
      profile.colorMessage = colorMessage;
      profile.colorQuote = colorQuote;

      profiles[idx] = profile;
      setProfiles(profiles);
    }
  }, [colorChanged]);

  useEffect(() => {
    const currentProfile = profiles.find(p => p.profile === profile);

    if (currentProfile) {
      setColorEmote(currentProfile.colorEmote);
      setColorMessage(currentProfile.colorMessage);
      setColorQuote(currentProfile.colorQuote);
    }
  }, [profile]);

  return (
    <div className="p-10 w-full  flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-6">
          <div className="flex flex-col justify-center">
            <Image priority src={Ferris} alt="" height={95} />
            <div className="text-3xl pl-1">
              SRP Tools
            </div>
          </div>
          <div className="text-4xl font-bold">
            Append breaker
          </div>
        </div>
        <Acknowledgements />
      </div>



      <div className="flex-row flex flex-grow gap-4">
        <div className="w-1/2">
          <div>Text</div>
          <textarea
            rows={15}
            className="w-full h-full text-container resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>


        <div className="w-1/2">
          <div>Preview</div>
          <div className="h-full text-container overflow-y-scroll overflow-x-visible">
            <RichFormat text={text} customColors={storedColors} defaultColor={colorEmote} defaultColorMessage={colorMessage} quotationColor={colorQuote} setFullText={setFullText} />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <div>
            <div>Emote color</div>
            <ColorBox color={colorEmote} setColor={setColorEmote} onChangeComplete={toggle} />
          </div>
          <div>
            <div>Message color</div>
            <ColorBox color={colorMessage} setColor={setColorMessage} onChangeComplete={toggle} />
          </div>
          <div>
            <div>Quote color</div>
            <ColorBox color={colorQuote} setColor={setColorQuote} onChangeComplete={toggle} />
          </div>

        </div>
        <div>
          <div>Recent colours</div>
          <RecentColours text={text} />
          <StoredColors colors={storedColors} onChange={setStoredColors} />
        </div>
      </div>

      <div className="flex gap-1 flex-col">
        <div>Appends copy</div>
        <div className="flex flex-row justify-between align-top justify-self-start">
          <div className="flex flex-row gap-3">
            <CopyButton text={fullText} />

            <div className="text-gray-500 text-sm">
              <div>If you need more than 6,</div>
              <div>you have a problem (Amore, probably)</div>
            </div>

          </div>

          <div>
            <div className="flex flex-row gap-2">
              <ProfileSelect profiles={profiles} onChange={setProfile} />
              <NewProfile onChange={setProfiles} />
              <RemoveProfile onChange={setProfiles} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );

}
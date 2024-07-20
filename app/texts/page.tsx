"use client";
import Coreval from "@/components/settings/coreval";
import Details from "@/components/settings/details";
import Landing from "@/components/settings/landing";
import Services from "@/components/settings/services";
import {
  ArrowBackIos,
  ArrowCircleDown,
  ArrowDownward,
  ArrowDropDown,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState } from "react";

function Texts() {
  const [landing, setLanding] = useState(false);
  function handleLanding() {
    setLanding((prevLanding) => !prevLanding);
  }

  const [detail, setDetail] = useState(false);
  function handleDetail() {
    setDetail((prevDetail) => !prevDetail);
  }

  const [service, setService] = useState(false);
  function handleService() {
    setService((prevService) => !prevService);
  }

  const [coreval, setCoreval] = useState(false);
  function handleCoreval() {
    setCoreval((prevCoreval) => !prevCoreval);
  }

  return (
    <div className="w-full p-5">
      <div className="flex flex-col justify-start gap-3 rounded-md bg-[#282828] border border-[#777777] text-[#777777] p-5">
        <div className="flex gap-3">
          {/* Display top image preview */}
          {/* {topImagePreview && (
              <div>
                <img
                  src={topImagePreview}
                  alt="Top Image Preview"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
            )} */}
          <div className="flex flex-col">
            <p className="text-[#ffffff] font-bold text-xl">LANDING IMAGE</p>

            <input
              type="file"
              required
              // onChange={(event) => {
              //   if (event.target.files && event.target.files[0]) {
              //     handleUpload(event.target.files[0]);
              //   }
              // }}
            />
          </div>
        </div>
        {/* landing */}
        <button
          onClick={handleLanding}
          className="w-full flex justify-start gap-3"
        >
          <p className="text-[#ffffff] font-bold text-xl">LANDING AREA</p>
          <ArrowDropDown
            className={`${landing == true ? "rotate-180" : ""} duration-300`}
          />
        </button>
        {landing ? (
          <>
            <Landing />
          </>
        ) : null}

        <button
          onClick={handleDetail}
          className="w-full flex justify-start gap-3"
        >
          <p className="text-[#ffffff] font-bold text-xl">DETAILS</p>
          <ArrowDropDown
            className={`${detail == true ? "rotate-180" : ""} duration-300`}
          />
        </button>
        {detail ? (
          <>
            <Details />
          </>
        ) : null}
        <button
          onClick={handleService}
          className="w-full flex justify-start gap-3"
        >
          <p className="text-[#ffffff] font-bold text-xl">SERVICES</p>
          <ArrowDropDown
            className={`${service == true ? "rotate-180" : ""} duration-300`}
          />
        </button>
        {service ? (
          <>
            <Services />
          </>
        ) : null}

        <button
          onClick={handleCoreval}
          className="w-full flex justify-start gap-3"
        >
          <p className="text-[#ffffff] font-bold text-xl">CORE VALUES</p>
          <ArrowDropDown
            className={`${coreval == true ? "rotate-180" : ""} duration-300`}
          />
        </button>
        {coreval ? (
          <>
            <Coreval />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Texts;

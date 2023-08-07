import React, { useState } from "react";
import SelectCategory from "./SelectCategory";
import { Button, TextField } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function Filter() {
  const [category, setCategory] = useState("General");
  const [value, setValue] = useState("");
  const [selectDate, setSelectDate] = useState([]);
  const handleChange = (date) => {
    setSelectDate(date);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: "10px auto",
        }}
      >
        <div style={{ display: "flex" }}>
          <TextField
            value={value}
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <SelectCategory category={category} setCategory={setCategory} />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DemoItem component="DateRangePicker">
              <DateRangePicker
                disableFuture
                onChange={handleChange}
                calendars={1}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="outlined" onClick={() => {}}>
          Search
        </Button>
      </div>
    </>
  );
}

import React, { useState } from "react";
import SelectCategory from "./SelectCategory";
import { Button, TextField } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const [category, setCategory] = useState("General");
  const [value, setValue] = useState("");
  const [selectDate, setSelectDate] = useState([]);
  const handleChange = (date) => {
    setSelectDate(date);
  };
  const navigate = useNavigate();
  const params = {};

  const onFilter = () => {
    const selectStartTime = selectDate[0] ? selectDate[0]["$d"] : 1;
    const oneDay = 86400 * 1000;
    const selectEndTime = selectDate[1]
      ? Number(selectDate[1]["$d"]) + oneDay
      : Date.now() + oneDay;
    const startTime = new Date(selectStartTime).getTime();
    const endTime = new Date(selectEndTime).getTime();

    if (category) {
      params.category = category;
    }
    if (value) {
      params.title = value;
    }

    if (startTime) {
      params.startTime = startTime;
    }
    if (endTime) {
      params.endTime = endTime;
    }

    const checkTitle = params.title ? `title=${params.title}` : "";
    const checkCategory = params.category ? `category=${params.category}` : "";
    navigate(
      `/search?${checkTitle}&${checkCategory}&start=${startTime}&end=${endTime}`
    );
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
            onKeyDown={(e) => {
              e.keyCode === 13 && onFilter();
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
        <Button variant="outlined" onClick={onFilter}>
          Search
        </Button>
      </div>
    </>
  );
}

import { TextField } from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BoxContent from "src/components/BoxContent";
import formatDate from "src/utils/formatDate";
import { DateRangePickerProps, ONE_DAY } from "./DateRangePicker.type";

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startTime,
  endTime,
  minDate,
  maxDate = new Date(),
  onChange,
  pickerMode = "DatePicker",
  inputFormat = "dd-MM-yyyy HH:mm:ss",
}) => {
  const [startDay, setStartDay] = useState<any>(
    startTime || new Date(Date.now() - 31 * ONE_DAY)
  );
  const [endDay, setEndDay] = useState<any>(endTime || new Date());

  console.log({ startDay, endTime });

  useEffect(() => {
    if (startDay > endDay) {
      toast.warning("Ngày bắt đầu phải bé hớn ngày kết thúc", {
        position: "bottom-right",
      });
      setStartDay(0);
      setEndDay(0);
      return;
    }

    onChange?.({
      start: startDay,
      end: endDay,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDay, endDay]);

  const handleStartDay = (startDay: any) => {
    // console.log("start day", formatDate.getDateTime(startDay));
    setStartDay(formatDate.getDateTime(startDay));
  };
  const handleEndDay = (endDay: any) => {
    // console.log("end day", formatDate.getDateTime(endDay));
    setEndDay(formatDate.getDateTime(endDay));
  };

  if (pickerMode === "DatePicker") {
    return (
      <BoxContent.NormalContent
        style={{ flexDirection: "row", width: "max-content", padding: 0 }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Chọn ngày bắt đầu"
            inputFormat={inputFormat}
            value={startDay || ""}
            onChange={handleStartDay}
            renderInput={(params: any) => <TextField {...params} />}
            maxDate={endDay || maxDate}
          />
          <DatePicker
            label="Chọn ngày kết thúc"
            inputFormat={inputFormat}
            value={endDay || ""}
            onChange={handleEndDay}
            renderInput={(params: any) => <TextField {...params} />}
            minDate={startDay || minDate}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </BoxContent.NormalContent>
    );
  } else {
    return (
      <BoxContent.NormalContent
        style={{ flexDirection: "row", width: "max-content", padding: 0 }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Chọn ngày bắt đầu"
            inputFormat={inputFormat}
            value={startDay || ""}
            onChange={handleStartDay}
            renderInput={(params: any) => <TextField {...params} />}
            maxDate={endDay || maxDate}
          />
          <DateTimePicker
            label="Chọn ngày kết thúc"
            inputFormat={inputFormat}
            value={endDay || ""}
            onChange={handleEndDay}
            renderInput={(params: any) => <TextField {...params} />}
            minDate={startDay || minDate}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </BoxContent.NormalContent>
    );
  }
};

export default DateRangePicker;

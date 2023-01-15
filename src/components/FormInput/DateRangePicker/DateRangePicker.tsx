import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import formatDate from "src/utils/formatDate";

interface DateRangePickerProps {
  startTime?: any;
  endTime?: any;
  onChange?: (value: any) => void;
  minDate?: string;
  maxDate?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startTime,
  endTime,
  minDate,
  maxDate,
  onChange,
}) => {
  const ONE_DAY = 3600 * 1000 * 24;
  //   const TIMER_IN_A_DAY = 3600 * 1000 * 24;
  const [startDay, setStartDay] = useState<any>(
    startTime || new Date(Date.now() - 31 * ONE_DAY)
  );
  const [endDay, setEndDay] = useState<any>(endTime || new Date());

  useEffect(() => {
    if (formatDate.getDateTime(startDay) - formatDate.getDateTime(endDay) > 0) {
      toast.warning("Ngày bắt đầu phải bé hớn ngày kết thúc", {
        position: "bottom-right",
      });
      setStartDay(0);
      setEndDay(0);
      return;
    }

    onChange?.({
      start: formatDate.getDateTime(startDay),
      end: formatDate.getDateTime(endDay),
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputFormat="dd/MM/yyyy"
        label="Chọn ngày bắt đầu"
        value={startDay || ""}
        onChange={handleStartDay}
        renderInput={(params: any) => (
          <TextField sx={{ width: 180 }} {...params} helperText={null} />
        )}
        maxDate={new Date()}
      />
      <DatePicker
        label="Chọn ngày kết thúc"
        inputFormat="dd/MM/yyyy"
        value={endDay || ""}
        onChange={handleEndDay}
        renderInput={(params: any) => (
          <TextField sx={{ width: 180 }} {...params} helperText={null} />
        )}
        maxDate={new Date()}
      />
    </LocalizationProvider>
  );
};

export default DateRangePicker;

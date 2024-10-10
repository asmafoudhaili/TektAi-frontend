import * as React from 'react';
import dayjs from 'dayjs';
import "./ResponsiveDateTimePickers.css";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

export default function ResponsiveDateTimePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
      <StaticDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
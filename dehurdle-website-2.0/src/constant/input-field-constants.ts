enum InputAdornmentPosition {
  End = 'end',
  Start = 'start',
}

enum InputPreset {
  Date = 'date',
  Dropdown = 'dropdown',
  Otp = 'otp',
  Number = 'number',
  Text = 'text',
}

enum InputMode {
  Numeric = 'numeric',
}

enum DateFormatType {
  DateFormat = 'DD MMM, YY', // 01 Jan 24
  FullDateDashFormat = 'DD-MM-YYYY', // ex: 25-01-24
  FullDateFormat = 'DD MMM YYYY', // ex: 1st Jan, 2024
}

export { DateFormatType, InputMode, InputAdornmentPosition, InputPreset };

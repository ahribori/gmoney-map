import { createMuiTheme } from "@material-ui/core"
import { teal as primary, lime as secondary } from "@material-ui/core/colors"

export const theme = createMuiTheme({
  palette: {
    primary,
    secondary
  },
  typography: {
    fontFamily: [
      "Noto Sans KR",
    ].join(",")
  }
})

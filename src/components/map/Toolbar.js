import React from "react"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { GpsFixed, Autorenew } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  rightTopToolbar: {
    position: "fixed",
    zIndex: 1000,
    right: theme.spacing(1),
    top: theme.spacing(8),
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
      top: theme.spacing(10),
      right: theme.spacing(2)
    }
  },
  leftTopToolbar: {
    position: "fixed",
    zIndex: 1000,
    left: theme.spacing(1),
    top: theme.spacing(8),
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
      top: theme.spacing(10),
      left: theme.spacing(2)
    }
  }
}))

const Toolbar = ({ pending, onLocationButtonClick, onFetchButtonClick }) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.rightTopToolbar}>
        <ButtonGroup
          orientation="vertical"
          variant="outlined"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button disabled={pending} onClick={() => onLocationButtonClick()}>
            <GpsFixed />
          </Button>
        </ButtonGroup>
      </div>
      {onFetchButtonClick && (
        <div className={classes.leftTopToolbar}>
          <ButtonGroup
            orientation="vertical"
            variant="outlined"
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button disabled={pending} onClick={() => onFetchButtonClick()}>
              <Autorenew />
              <span style={{ marginBottom: 1 }}>이 위치에서 가맹점 불러오기</span>
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  )
}

Toolbar.defaultProps = {
  onLocationButtonClick: () => {},
  onRenewButtonClick: () => {},
  onFilterButtonClick: () => {}
}

export default Toolbar

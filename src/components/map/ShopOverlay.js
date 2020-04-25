import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  normal: {
    padding: theme.spacing(0.7),
    textAlign: "center",
    minWidth: 40
  },
  title: {
    fontSize: 13,
    fontWeight: 700
  },
  content: {
    fontSize: 11
  }
}))

const ShopOverlay = ({ place }) => {
  const classes = useStyles()

  const { name } = place

  return (
    <div className={classes.container} data-shop-code="a">
      <Typography className={classes.title} component="p">
        {name}
      </Typography>
    </div>
  )
}

export default ShopOverlay

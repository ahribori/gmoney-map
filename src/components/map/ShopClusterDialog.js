import React from "react"
import Dialog from "@material-ui/core/Dialog"
import { DialogActions, DialogContent } from "@material-ui/core"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import ClearIcon from "@material-ui/icons/Clear"
import { makeStyles } from "@material-ui/core/styles"
import { indigo } from "@material-ui/core/colors"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"

const useStyles = makeStyles(theme => ({
  tel: {
    fontSize: 11,
    display: "block",
    textDecoration: "none",
    color: indigo[700]
  },
  address: {
    fontSize: 13,
    display: "block"
  },
  closeButton: {
    position: "absolute",
    right: 2,
    top: 2,
    zIndex: 999,
  }
}))

const ShopClusterDialog = ({ open, handleClose, clusterShops }) => {
  const classes = useStyles()

  return (
    <Dialog
      transitionDuration={0}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      style={{ minWidth: 300 }}
    >
      <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose()}>
        <ClearIcon />
      </IconButton>
      <DialogContent>
        <List component="div" aria-label="cluster-shops">
          {clusterShops &&
            clusterShops.map((shop, index) => {
              const { place } = shop
              const { name, tel, jibunAddress } = place
              return (
                <ListItem key={`list-${shop}-${index}`}>
                  <ListItemText
                    primary={name}
                    secondary={
                      <>
                        <Box component="span" variant={"subtitle2"} className={classes.address}>
                          {jibunAddress}
                        </Box>
                        <a className={classes.tel} href={`tel:${tel}`}>
                          {tel}
                        </a>
                      </>
                    }
                  />
                </ListItem>
              )
            })}
        </List>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}

export default ShopClusterDialog

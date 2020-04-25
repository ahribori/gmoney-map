import React from "react"
import Dialog from "@material-ui/core/Dialog"
import { DialogActions, DialogContent } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"

const ShopClusterDialog = ({ open, handleClose, clusterShops }) => {
  console.log(clusterShops)
  return (
    <Dialog
      transitionDuration={0}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      style={{ minWidth: 300 }}
    >
      {/*<DialogTitle id="filter-dialog-title">필터</DialogTitle>*/}
      <DialogContent>
        <List component="div" aria-label="cluster-shops">
          {clusterShops &&
            clusterShops.map((shop, index) => {
              const { place } = shop
              const { name, tel } = place
              return (
                <ListItem key={`list-${shop}-${index}`}>
                  <ListItemText primary={name} secondary={tel} />
                </ListItem>
              )
            })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant={"contained"} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShopClusterDialog

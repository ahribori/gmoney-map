import React from "react"
import Dialog from "@material-ui/core/Dialog"
import { DialogActions, DialogContent } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  category: {
    fontSize: 11,
    display: "block"
  },
  address: {
    fontSize: 13,
    display: "block"
  }
}))

const SearchResultDialog = ({ open, handleClose, searchResults, handleClickItem }) => {
  const classes = useStyles()
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
          {searchResults &&
            searchResults.map((result, index) => {
              const { id, place_name, category_name, address_name } = result
              return (
                <ListItem
                  key={`list-${id}-${index}`}
                  button={true}
                  onClick={() => {
                    if (handleClickItem) {
                      handleClickItem(result)
                    }
                  }}
                >
                  <ListItemText
                    primary={place_name}
                    secondary={
                      <>
                        <Box component="span" variant={"subtitle2"} className={classes.category}>
                          {category_name}
                        </Box>
                        <Box component="span" variant={"subtitle2"} className={classes.address}>
                          {address_name}
                        </Box>
                      </>
                    }
                  />
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

export default SearchResultDialog

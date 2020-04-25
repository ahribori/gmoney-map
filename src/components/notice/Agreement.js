import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

const Agreement = ({ serviceOpen }) => {
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">알려드립니다</DialogTitle>
      <DialogContent>
        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 경기도 지역화폐 가맹점 정보입니다. 일부 매장에서는 지류 상품권만 사용이 가능하오니 카드
          사용은 확인 후 방문하세요. (출처 : 경기데이터드림)
        </Typography>

        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 경기도 지역화폐 가맹점이더라도 매장에서 주소정보를 입력하지 않았을 경우 지도에 나오지
          않을 수 있으니 참고부탁드립니다.
        </Typography>

        <Typography variant="body2" gutterBottom style={{ fontSize: 13 }}>
          * 해당 지역에 매장이 너무 많은 경우 가까운 순서대로 최대 300개까지 보여주니 더 자세히 보고
          싶으시면 지도를 확대한 뒤 "이 위치에서 가맹점 불러오기" 버튼을 다시 눌러주세요.
        </Typography>

        <Divider style={{ margin: "10px 0" }} />

        <Typography variant="body2" gutterBottom style={{ fontSize: 11 }}>
          데이터 관련 문의: 경기데이터드림(
          <a href="https://data.gg.go.kr/portal/mainPage.do">
            https://data.gg.go.kr/portal/mainPage.do
          </a>
          )
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant={"contained"} color="primary" disabled={!serviceOpen}>
          {serviceOpen ? "확인" : "서비스 준비중"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Agreement

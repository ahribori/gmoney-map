import React, { useCallback, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "../appbar/AppBar"
import Toolbar from "./Toolbar"
import LinearProgress from "@material-ui/core/LinearProgress"
import API from "../../api/API"
import Info from "../info/Info"
import axios from "axios"
import "tippy.js/dist/tippy.css"
import { cancelFetchShopsByBounds } from "../../api/Shop"
import IconButton from "@material-ui/core/IconButton"
import Snackbar from "@material-ui/core/Snackbar"
import { Close } from "@material-ui/icons"
import ShopClusterDialog from "./ShopClusterDialog"
import SearchResultDialog from "./SearchResultDialog"

const useStyles = makeStyles(theme => ({
  map: {
    width: "100%",
    height: "100%",
    marginBottom: 50
  },
  progress: {
    position: "fixed",
    zIndex: 9999,
    width: "100%"
  },
  dimmer: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    pointerEvents: "none"
  },
  snackBar: {
    bottom: 58
  }
}))

const Map = ({ serviceOpen }) => {
  const [pending, setPending] = useState(true)
  const [kakao] = useState(window.kakao)
  const [map, setMap] = useState(null)
  const [info, setInfo] = useState("")
  const [toast, setToast] = useState(null)
  const [clusterer, setClusterer] = useState(null)
  const [fetched, setFetched] = useState(false)
  const [clusterShops, setClusterShops] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const classes = useStyles()

  /**
   * 장소 검색
   * @param keyword 검색어
   */
  const searchPlace = keyword => {
    setPending(true)
    const places = new kakao.maps.services.Places()
    places.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(result)
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setToast("검색 결과가 없습니다.")
      } else {
        setToast("서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.")
      }
      setPending(false)
    })
  }

  const handleClickSearchResult = item => {
    const { x, y } = item
    const moveLatLng = new kakao.maps.LatLng(y, x)
    map.panTo(moveLatLng)
    map.setLevel(3)
    setSearchResults(null)
    fetchShops()
  }

  const fetchShops = () => {
    if (serviceOpen) {
      const center = map.getCenter()
      const { Ha: lat, Ga: lng } = center
      const level = map.getLevel()
      const radius = (level + 4) ** 2 * 12
      console.log("radius", radius)
      console.log("center", center)

      setToast("주변 가맹점을 불러오는중...")
      setPending(true)
      API.Shop.fetchShopsByBounds(lat, lng, radius)
        .then(response => {
          const shops = response.data
          setShopOverlays(shops)
          setPending(false)
          setFetched(true)
          setToast(null)
        })
        .catch(thrown => {
          if (!axios.isCancel(thrown)) {
            setToast("데이터를 가져오지 못했습니다.")
          }
          setPending(false)
        })
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      setPending(true)
      navigator.geolocation.getCurrentPosition(
        position => {
          const { coords } = position
          const { latitude, longitude } = coords
          console.log("getLocation", latitude, longitude)
          const moveLatLng = new kakao.maps.LatLng(latitude, longitude)
          map.panTo(moveLatLng)
          setTimeout(() => {
            fetchShops()
          }, 500)
          setPending(false)
        },
        () => {
          setPending(false)
          setToast("내 위치를 불러올 수 없습니다.")
        }
      )
    } else {
      setToast("위치를 불러올 수 없습니다.")
    }
  }

  const setShopOverlays = useCallback(
    shops => {
      if (clusterer) {
        clusterer.clear()
      }
      const _clusterer = new kakao.maps.MarkerClusterer({
        map,
        averageCenter: true,
        minLevel: 2
      })

      const markers = []

      const shopsGroupByName = {}

      for (let i = 0; i < shops.length - 1; i++) {
        const shop = shops[i]
        const { place, coords } = shop
        const { name } = place
        const { lat, lon } = coords

        shopsGroupByName[name] = shop

        const marker = new kakao.maps.Marker({
          title: name,
          text: name,
          map,
          position: new kakao.maps.LatLng(lat, lon)
        })

        kakao.maps.event.addListener(marker, "click", function() {
          setClusterShops([shop])
        })

        markers.push(marker)
      }

      kakao.maps.event.addListener(_clusterer, "clusterclick", cluster => {
        const level = map.getLevel()
        const markers = cluster.getMarkers()
        if (level === 2 && markers) {
          const _clusterShops = markers.map(marker => {
            const name = marker.mc
            return shopsGroupByName[name]
          })
          setClusterShops(_clusterShops)
        }
      })

      _clusterer.addMarkers(markers)
      setClusterer(_clusterer)
    },
    // eslint-disable-next-line
    [clusterShops, clusterer, map]
  )

  const handleSearch = searchText => {
    if (searchText) {
      searchPlace(searchText)
    }
  }

  const handleFetchButtonClick = () => {
    fetchShops()
  }

  useEffect(() => {
    const container = document.getElementById("map") //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.4019528117587, 127.10828323199647), //지도의 중심좌표.
      level: 5 //지도의 레벨(확대, 축소 정도)
    }

    const map = new kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
    map.setMinLevel(2)
    setMap(map)
    setPending(false)
  }, [kakao.maps])

  useEffect(() => {
    const onChange = function() {
      const level = map.getLevel()
      if (level <= 5) {
        setInfo("")
        setFetched(false)
      } else {
        if (cancelFetchShopsByBounds) {
          cancelFetchShopsByBounds()
          setPending(false)
        }
        setFetched(true)
        setInfo("지도를 좀 더 확대해주세요")
      }
    }

    if (map) {
      // 맵 처음 로딩되었을때 위치정보 요청하는 것 제거
      getLocation()
      kakao.maps.event.addListener(map, "tilesloaded", onChange)
    }
    // eslint-disable-next-line
  }, [map])

  return (
    <>
      <AppBar onSearch={handleSearch} />
      <Toolbar
        pending={pending}
        onLocationButtonClick={getLocation}
        onFetchButtonClick={fetched ? null : handleFetchButtonClick}
      />
      {pending && (
        <>
          <LinearProgress color="secondary" className={classes.progress} />
          <div className={classes.dimmer} />
        </>
      )}
      <ShopClusterDialog
        handleClose={() => setClusterShops(null)}
        open={!!clusterShops}
        clusterShops={clusterShops}
      />
      <SearchResultDialog
        handleClose={() => setSearchResults(null)}
        open={!!searchResults}
        searchResults={searchResults}
        handleClickItem={handleClickSearchResult}
      />
      {info && <Info message={info} />}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        message={toast}
        className={classes.snackBar}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setToast(null)}
            >
              <Close />
            </IconButton>
          </React.Fragment>
        }
      />
      <div id="map" className={classes.map} />
    </>
  )
}

export default Map

import axios from "axios"

const CancelToken = axios.CancelToken
export let cancelFetchShopsByBounds

export class Shop {
  fetchShopsByBounds(lat, lng, radius) {
    if (cancelFetchShopsByBounds) {
      cancelFetchShopsByBounds()
    }
    return axios.get(
      `https://gmoneyapi.toast.paas-ta.com/api/shops/search?lat=${lat}&lon=${lng}&radius=${radius}`,
      {
        cancelToken: new CancelToken(c => {
          cancelFetchShopsByBounds = c
        })
      }
    )
  }
}

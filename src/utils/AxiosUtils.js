import Axios from "axios";
import { useStore } from "vuex";
import { ACTIONS } from "../store/actions";

export function authRequest(config) {
  let _store = useStore();
  Axios(config)
    .then((result) => {
      if (result.status == 200) {
        _store.dispatch(ACTIONS.ADD_TOKEN, result.data.token);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function fetchImageList(config) {
  let _store = useStore();
  Axios(config)
    .then((result) => {
      if (result.status == 200) {
        _store.dispatch(ACTIONS.CLEAR_CURRENT_IMAGES).then(() => {
          _store.dispatch(ACTIONS.FILL_CURRENT_IMAGES, result.data);
        });
      }
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.log(err);
    });
}

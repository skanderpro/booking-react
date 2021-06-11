import axios from "axios";
import { ADD_LOCAL_CART, GET_REMOTE_CART } from "./actionTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function addLocalCart(classItem) {
  return (dispatch, getState) => {
    let items = getState().cart.items;
    let status = false;
    console.log(classItem);
    let classItemDetail = {
      id: classItem.id,
      name: classItem.product.name,
      image_url: classItem.product.image_url,
      price: classItem.product.price,
      set: classItem.product.set,
      is_set: false,
      product_id: classItem.id,
      type: classItem.type,
    };
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === classItem.id) {
        status = true;
      }
    }
    if (!status) {
      items.push(classItemDetail);
    }

    dispatch(importItemsToCart(items));
  };
}

export function importItemsToCart(items) {
  return {
    type: ADD_LOCAL_CART,
    data: { items: items },
  };
}

export function removeLocalCart(id) {
  return async (dispatch, getState) => {
    let items = getState().cart.items;
    let index = items.findIndex((x) => x.id === id);

    items.splice(index, 1);

    dispatch(importItemsToCart(items));
  };
}

export function getRemoteCart() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.get(`${mainUrl}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
}

export function addRemoteCart(product_id, is_set, type) {
  console.log(type);
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.post(
      `${mainUrl}/api/cart`,
      {
        product_id,
        is_set,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}

export function removeRemoteCart(cart_id) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    await axios.delete(`${mainUrl}/api/cart/${cart_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

export function loginCart() {
  return async (dispatch, getState) => {
    // let mainUrl = getState().settings.mainUrl;
    // let token = cookies.get('token');

    let localCarts = getState().cart.items;
    let remoteCarts = await dispatch(getRemoteCart());
    console.log(localCarts);
    if (localCarts.length > 0) {
      await dispatch(cartClear());

      for (var i = 0; i < localCarts.length; i++) {
        console.log(localCarts[i]);
        await dispatch(
          addRemoteCart(
            localCarts[i].id,
            localCarts[i].is_set,
            localCarts[i].type
          )
        );
      }
    } else {
    }
  };
}

export function cartClear() {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.delete(`${mainUrl}/api/cart/clear`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
}

export function changeCartIsSet(id, value) {
  return async (dispatch, getState) => {
    let mainUrl = getState().settings.mainUrl;
    let token = cookies.get("token");
    let response = await axios.patch(
      `${mainUrl}/api/cart/change-attribute`,
      {
        cart_id: id,
        attribute: "is_set",
        value: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
}
